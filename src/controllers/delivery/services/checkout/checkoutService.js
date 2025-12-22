const { assertProductsExist } = require("../orders/product.validator");
const {
  assertNotDuplicateOrReturn,
  createPendingOrder,
  markOrderAuthorized,
  markOrderPaid,
  markOrderFailed,
  findByCheckoutRequestId, // ✅ la usaremos para reintentos
} = require("../orders/order.repo");

const {
  authorizePayment,
  capturePayment,
  cancelPayment,
} = require("../payments/stripe.service");

const { acceptQuote } = require("../doordash/doordash.service");
const { sendOrderEmails } = require("./orderEmail.service");
const { prisma } = require("../../../../lib/prisma");
const { mapDoorDashStatusToPrisma } = require("../../../../utils/createDoorDashJwt");
const { HttpError } = require("../errors/httpError");

// Helpers para estados
const FINAL = new Set(["PAID", "PROCESSING", "COMPLETED"]);
const IN_PROGRESS = new Set(["PENDING", "AUTHORIZED"]);
const DEAD = new Set(["FAILED", "CANCELLED", "PAYMENT_CAPTURE_FAILED", "REFUNDED"]);

// Para tip seguro
function toTipCents(tip) {
  if (tip == null) return null;
  const n = Number(tip);
  return Number.isFinite(n) ? n : null;
}

function nowIso() {
  return new Date().toISOString();
}

/**
 * runDeliveryCheckout(payload)
 *
 * ✅ Flujo seguro + idempotente:
 * 0) check checkoutRequestId
 * 1) si existe orden FINAL -> devolver (alreadyProcessed=true)
 * 2) validar productos
 * 3) crear order PENDING (lock)
 * 4) Stripe authorize (manual capture)
 * 5) marcar AUTHORIZED
 * 6) DoorDash acceptQuote
 * 7) crear Delivery
 * 8) Stripe capture
 * 9) marcar order PAID y devolver order + delivery
 *
 * ⚠️ Importante:
 * - Solo devolvemos "success final" si llegamos a PAID (o estado FINAL).
 * - Si se cae en mitad del camino, una repetición con el mismo checkoutRequestId
 *   debe "reanudar" en vez de devolver AUTHORIZED con éxito.
 */
async function runDeliveryCheckout(payload) {
  const {
    checkoutRequestId, // ✅ obligatorio (idempotencia)
    items,
    amount,
    subtotal,
    paymentMethodId,

    customerEmail,
    customerPhone,
    customerAddress,
    lastName,
    customerName,

    billingCity,
    billingState,
    zipcode,

    apartment,
    company,
    specifications,
    userId,

    externalDeliveryId, // quoteId
    tip,

    driverInstructions,
  } = payload;

  // 0) Validación básica
  if (!checkoutRequestId) {
    throw new HttpError(400, "MISSING_CHECKOUT_REQUEST_ID", "checkoutRequestId is required.");
  }

  if (!externalDeliveryId) {
    throw new HttpError(400, "MISSING_EXTERNAL_DELIVERY_ID", "externalDeliveryId (quote id) is required.");
  }

  if (!items?.length) {
    throw new HttpError(400, "EMPTY_CART", "items is required.");
  }

  // 0.1) Idempotencia FINAL: si ya terminó, devuelve esa orden (con delivery si existe)
  // ⚠️ assertNotDuplicateOrReturn debe devolver SOLO FINAL
  const existingFinal = await assertNotDuplicateOrReturn(checkoutRequestId);
  if (existingFinal) {
    return {
      order: existingFinal,
      delivery: existingFinal.delivery ?? null,
      alreadyProcessed: true,
    };
  }

  // 0.2) Si existe pero está a medio camino (PENDING/AUTHORIZED), NO devolverlo como final.
  // En vez de eso: intenta reanudar.
  const existing = await findByCheckoutRequestId(checkoutRequestId);
  if (existing) {
    if (DEAD.has(existing.status)) {
      throw new HttpError(
        409,
        "CHECKOUT_ALREADY_USED",
        "This checkout attempt is no longer valid. Please refresh and try again.",
        { status: existing.status }
      );
    }
    // Si está en progreso, seguimos el flujo (reanudar).
  }

  // 1) validar productos
  await assertProductsExist(items);

  // userData opcional
  let userData = {};
  const cleanUserId = typeof userId === "string" && userId.trim() ? userId.trim() : null;
  if (cleanUserId) {
    const userExists = await prisma.user.findUnique({
      where: { id: cleanUserId },
      select: { id: true },
    });
    if (userExists) userData = { user: { connect: { id: cleanUserId } } };
  }

  // 2) Crear/obtener order PENDING como lock
  // - Si no existía, la creamos.
  // - Si existía en PENDING/AUTHORIZED, la reusamos.
  let pendingOrder = existing;

  if (!pendingOrder) {
    const { generateUniqueOrderNumber } = require("../../../../utils/generateOrderNumber");
    const orderNumber = await generateUniqueOrderNumber();

    pendingOrder = await createPendingOrder({
      checkoutRequestId,
      orderNumber,
      subtotal,
      amount,
      paymentMethodId, // se guarda en snapshot en tu schema
      customer: {
        firstName: customerName,
        lastName,
        email: customerEmail,
        phone: customerPhone,
        note: specifications ?? "",
      },
      address: {
        line1: customerAddress,
        line2: apartment ?? null,
        company: company ?? null,
        city: billingCity,
        state: billingState,
        zip: zipcode,
      },
      items,
      userData,
      fulfillmentType: "DELIVERY",
    });
  } else {
    // Si existe en progreso, validamos consistencia mínima (opcional)
    // para evitar que reintenten con otro carrito pero mismo checkoutRequestId.
    if (!IN_PROGRESS.has(pendingOrder.status)) {
      throw new HttpError(
        409,
        "CHECKOUT_STATE_INVALID",
        "Checkout request is not in a retryable state.",
        { status: pendingOrder.status }
      );
    }
  }

  // Variables del flujo
  let paymentIntent = null;
  let ddData = null;
  let acceptBody = null;


    // 2.5) Construir items para DoorDash (Item Level Details)
  //    - name (requerido)
  //    - quantity (requerido)
  //    - external_id (opcional, pero útil)
  //    - description (opcional)
  const productIds = items.map((i) => i.productId);

  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
    select: {
      id: true,
      name: true,
      // description: true, // si tu modelo la tiene
    },
  });

  const ddItems = items.map((it) => {
    const prod = products.find((p) => p.id === it.productId);
    const baseName = prod?.name || "Item";

    // Opcional: construimos una description amigable con opciones + notas
    let descriptionParts = [];

    if (Array.isArray(it.options) && it.options.length > 0) {
      const optsText = it.options
        .map((opt) => `${opt.groupName}: ${opt.name}`)
        .join(" | ");
      descriptionParts.push(`Options: ${optsText}`);
    }

    if (it?.specifications) {
      descriptionParts.push(`Notes: ${it.specifications}`);
    }

    return {
      name: baseName,                 // required
      quantity: Number(it.quantity),  // required
      external_id: it.productId,      // opcional pero recomendado
      description:
        descriptionParts.length > 0 ? descriptionParts.join(" || ") : undefined,
    };
  });

  try {
    // 3) STRIPE: authorize
    // Si ya teníamos stripePaymentIntentId guardado (retry), lo ideal es:
    // - recuperar el PI y ver su estado
    // - si está requires_capture, reusarlo
    // Pero como tu stripe.service probablemente ya implementa idempotencia por checkoutRequestId,
    // lo dejamos simple (Stripe idempotency key).
    paymentIntent = await authorizePayment({
      checkoutRequestId, // clave idempotente
      amountUsd: amount,
      paymentMethodId,
      metadata: {
        orderNumber: pendingOrder.orderNumber,
        customerEmail,
        company: company ?? "",
        zipcode,
        fulfillmentType: "DELIVERY",
        externalDeliveryId,
        checkoutRequestId,
        createdAtIso: nowIso(),
      },
      shipping: {
        name: `${customerName} ${lastName}`,
        address: {
          line1: customerAddress,
          line2: apartment ?? undefined,
          city: billingCity,
          state: billingState,
          postal_code: zipcode,
          country: "US",
        },
        phone: customerPhone,
      },
    });

    // 3.1) Guardar PI + status AUTHORIZED (solo si no estaba ya)
    // Si ya estaba AUTHORIZED con el mismo PI, update repetido es ok.
    await markOrderAuthorized(pendingOrder.id, paymentIntent.id);

    // 4) DoorDash accept quote
    const tipCents = toTipCents(tip);
    const accepted = await acceptQuote({
      externalDeliveryId,
      items: ddItems, 
      tip: tipCents, // tu servicio decide si lo manda o no
    });
    ddData = accepted.ddData;
    acceptBody = accepted.acceptBody;

    console.log("[DoorDash] acceptQuote ddData keys:", Object.keys(ddData));
console.log("[DoorDash] acceptQuote ddData.external_delivery_id:", ddData.external_delivery_id);
console.log("[DoorDash] acceptQuote ddData.delivery_id:", ddData.delivery_id);
console.log("[DoorDash] acceptQuote full ddData:", JSON.stringify(ddData, null, 2));
    // 5) Crear delivery SOLO si no existe ya (retry-safe)
    // Como Order tiene relación 1-1 Delivery?, evita duplicar:
    let delivery = await prisma.delivery.findUnique({
      where: { orderId: pendingOrder.id },
    });

    if (!delivery) {
      const deliveryStatus = mapDoorDashStatusToPrisma(ddData.delivery_status);

        console.log("[Delivery] Creating delivery for order", pendingOrder.id, {
    externalDeliveryIdFromDd: ddData.external_delivery_id,
    externalDeliveryIdFromPayload: externalDeliveryId,
    deliveryIdFromDd: ddData.delivery_id,
  });

      const DELIVERY_SUPPORTS_DRIVER_INSTRUCTIONS =
        process.env.DELIVERY_SUPPORTS_DRIVER_INSTRUCTIONS === "true";

      delivery = await prisma.delivery.create({
        data: {
          orderId: pendingOrder.id,
          provider: "DOORDASH",

          ...(DELIVERY_SUPPORTS_DRIVER_INSTRUCTIONS
            ? { driverInstructions: driverInstructions ?? "" }
            : {}),

          externalDeliveryId: ddData.external_delivery_id || externalDeliveryId,
          doordashDeliveryId: ddData.delivery_id || null,
          status: deliveryStatus,

          pickupAddress: ddData.pickup_address || null,
          dropoffAddress: ddData.dropoff_address || customerAddress,
          dropoffName:
            ddData.dropoff_business_name || `${customerName} ${lastName}`.trim(),
          dropoffPhone: ddData.dropoff_phone_number || customerPhone,

          trackingUrl: ddData.tracking_url || null,
          deliveryFee: typeof ddData.fee === "number" ? ddData.fee / 100 : null,
          tipAmount: typeof ddData.tip === "number" ? ddData.tip / 100 : null,
          currency: ddData.currency || "USD",

          driverName: ddData.dasher_name || null,
          driverPhone: ddData.dasher_dropoff_phone_number || null,

          etaPickup: ddData.pickup_time_estimated
            ? new Date(ddData.pickup_time_estimated)
            : null,
          etaDropoff: ddData.dropoff_time_estimated
            ? new Date(ddData.dropoff_time_estimated)
            : null,
          deliveredAt: ddData.dropoff_time_actual
            ? new Date(ddData.dropoff_time_actual)
            : null,

          rawRequest: acceptBody ?? {},
          rawResponse: ddData ?? {},
        },
      });
    }

    // 6) STRIPE capture (idempotente por checkoutRequestId)
    try {
      await capturePayment({ checkoutRequestId, paymentIntentId: paymentIntent.id });
    } catch (capErr) {
      await markOrderFailed(pendingOrder.id, "PAYMENT_CAPTURE_FAILED", {
        at: nowIso(),
        message: capErr?.message,
      });

      throw new HttpError(
        502,
        "PAYMENT_CAPTURE_FAILED",
        "Payment authorization succeeded but capture failed. Please contact support.",
        { message: capErr?.message }
      );
    }

    // 7) Mark order PAID y devolver orden completa con delivery
    const paidOrder = await markOrderPaid(pendingOrder.id);

    // trae delivery para respuesta consistente
  const finalOrder = await prisma.order.findUnique({
  where: { id: paidOrder.id },
  include: {
    items: {
      include: {
        product: { select: { name: true } }, // ✅ esto habilita it.product.name
      },
    },
    delivery: true,
  },
});

    // 8) Emails (solo si el checkout terminó bien y el cliente lo pidió)
if (payload.sendEmail) {
  try {
   
    await sendOrderEmails({
      order: finalOrder || paidOrder,
      logoUrl: process.env.ASSETS_URL,
    });
  } catch (emailErr) {
    // No rompas el checkout por fallo de email
    console.warn("[Email] Failed to send order emails:", emailErr?.message);
  }
}


    return {
      order: finalOrder || paidOrder,
      delivery: finalOrder?.delivery ?? null,
      alreadyProcessed: false,
    };
  } catch (err) {
    // Si falló después de autorizar, cancela PI (libera fondos)
    if (paymentIntent?.id) {
      try {
        await cancelPayment(paymentIntent.id);
      } catch {}
    }

    // Marca FAILED con failureDetails Json (tu schema lo soporta)
    // ✅ guardamos data útil: code, message, upstream, etc.
    await markOrderFailed(pendingOrder.id, "FAILED", {
      at: nowIso(),
      code: err?.code,
      message: err?.message,
      details: err?.details,
    });

    throw err;
  }
}

module.exports = { runDeliveryCheckout };
