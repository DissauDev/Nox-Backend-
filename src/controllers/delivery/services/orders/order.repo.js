const { prisma } = require("../../../../lib/prisma");
const { HttpError } = require("../errors/httpError");

const FINAL_OR_ACTIVE = new Set(["PAID", "AUTHORIZED", "PROCESSING"]);
const DEAD = new Set(["FAILED", "CANCELLED", "PAYMENT_CAPTURE_FAILED", "REFUNDED"]);

async function findByCheckoutRequestId(checkoutRequestId) {
  if (!checkoutRequestId) return null;
  return prisma.order.findUnique({
    where: { checkoutRequestId },
    include: { items: true },
  });
}

async function assertNotDuplicateOrReturn(checkoutRequestId) {
  const existing = await findByCheckoutRequestId(checkoutRequestId);
  if (!existing) return null;

  if (FINAL_OR_ACTIVE.has(existing.status)) {
    // Idempotente: devuelve la misma orden (el frontend no debe crear otra)
    return existing;
  }

  if (DEAD.has(existing.status)) {
    throw new HttpError(
      409,
      "CHECKOUT_ALREADY_USED",
      "This checkout attempt is no longer valid. Please refresh and try again.",
      { status: existing.status }
    );
  }

  // Si aparece un estado inesperado, tratamos como “active” para no duplicar.
  return existing;
}


async function createPendingOrder({
  checkoutRequestId,
  orderNumber,
  subtotal,
  amount,
  paymentMethodId,
  customer,
  address,
  items,
  userData,
  fulfillmentType,
}) {
  try {
    const order = await prisma.order.create({
      data: {
        checkoutRequestId,
        orderNumber,
        status: "PENDING",

        subtotal: Number(subtotal),
        totalAmount: Number(amount),

        paymentMethod: "Stripe", // fijo por tu flujo
        fulfillmentType, // "DELIVERY"

        customerName: customer.firstName,
        customerLastname: customer.lastName,
        customerEmail: customer.email,
        customerPhone: customer.phone,

        customerAddress: address.line1,
        apartment: address.line2 ?? null,
        company: address.company ?? null,
        billingCity: address.city,
        billingState: address.state,
        zipcode: address.zip,

        specifications: customer.note ?? "",

        paymentMethodIdSnapshot: paymentMethodId, // opcional si quieres auditar (si no existe en schema, quítalo)

        ...userData,

        items: {
          create: items.map((i) => ({
            product: { connect: { id: i.productId } },
            quantity: Number(i.quantity),
            price: Number(i.price),
            chosenOptions: i.options ?? null,
            specifications: i?.specifications || "",
          })),
        },
      },
      include: { items: true },
    });

    return order;
  } catch (e) {
    // Prisma unique error
    if (String(e?.code) === "P2002") {
      const existing = await findByCheckoutRequestId(checkoutRequestId);
      if (existing) return existing;
    }
    throw e;
  }
}

async function markOrderAuthorized(orderId, stripePaymentIntentId) {
  return prisma.order.update({
    where: { id: orderId },
    data: {
      status: "AUTHORIZED",
      stripePaymentIntentId,
    },
    include: { items: true },
  });
}

async function markOrderPaid(orderId) {
  return prisma.order.update({
    where: { id: orderId },
    data: { status: "PAID" },
    include: { items: true },
  });
}

async function markOrderFailed(orderId, status = "FAILED", failureDetails) {
  return prisma.order.update({
    where: { id: orderId },
    data: {
      status,
      failureDetails: failureDetails ? JSON.stringify(failureDetails) : null, // si tienes field; si no, quita
    },
  });
}

module.exports = {
  findByCheckoutRequestId,
  assertNotDuplicateOrReturn,
  createPendingOrder,
  markOrderAuthorized,
  markOrderPaid,
  markOrderFailed,
};
