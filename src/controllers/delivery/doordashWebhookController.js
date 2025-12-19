const { prisma } = require("../../lib/prisma");
const { sendEmail: sendEmailFn } = require("../../utils/email"); // ajusta la ruta si hace falta
const {
  sendAdminDeliveryCancelledNotification,
} = require("../../utils/emailToOrderAdmin"); // ajusta la ruta según tu estructura

// ✅ DeliveryStatus (ajústalo a TU enum real)
function mapEventToDeliveryStatus(eventName) {
  switch (eventName) {
    case "DASHER_CONFIRMED":
      return "ACCEPTED";

    case "DASHER_CONFIRMED_PICKUP_ARRIVAL":
    case "dasher_enroute_to_pickup":
      return "OUT_FOR_DELIVERY";

    case "DASHER_PICKED_UP":
      return "PICKED_UP";

    case "DASHER_CONFIRMED_DROPOFF_ARRIVAL":
    case "dasher_enroute_to_dropoff":
      return "OUT_FOR_DELIVERY";

    case "DASHER_DROPPED_OFF":
      return "DELIVERED";

    case "DELIVERY_CANCELLED":
      return "CANCELLED";

    default:
      return null;
  }
}

// ✅ OrderStatus (según tu enum NUEVO)
function mapEventToOrderStatus(eventName) {
  switch (eventName) {
    case "DASHER_CONFIRMED":
      return "PROCESSING";

    case "DASHER_PICKED_UP":
    case "DASHER_CONFIRMED_DROPOFF_ARRIVAL":
    case "dasher_enroute_to_dropoff":
      return "OUT_FOR_DELIVERY";

    case "DASHER_DROPPED_OFF":
      return "COMPLETED";

    case "DELIVERY_CANCELLED":
      return null;

    default:
      return null;
  }
}
const FINAL_DELIVERY = new Set(["DELIVERED", "CANCELLED"]);

// helper para no “pisar” campos con undefined
function pickDefined(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined)
  );
}

/**
 * POST /api/webhooks/doordash
 */


const handleDoorDashWebhook = async (req, res) => {
  try {
    // 1) Auth simple opcional
    const expectedAuth = process.env.DOORDASH_WEBHOOK_AUTH;
    if (expectedAuth) {
      const incomingAuth = req.headers["authorization"];
      if (!incomingAuth || incomingAuth !== expectedAuth) {
        return res.status(401).send("Unauthorized");
      }
    }

    // 2) Payload
    const event = req.body;

    const { event_name, external_delivery_id } = event || {};
    if (!event_name || !external_delivery_id) {
      return res.status(400).json({
        success: false,
        message: "Invalid webhook payload: event_name/external_delivery_id missing",
        received: event,
      });
    }

    // 3) Buscar delivery + order
    const delivery = await prisma.delivery.findUnique({
      where: { externalDeliveryId: external_delivery_id },
      include: { order: true },
    });

    if (!delivery) {
      // DoorDash recomienda responder 200 para que no reintente eternamente
      return res.status(200).json({
        success: true,
        received: true,
        ignored: true,
        reason: "Delivery not found",
        external_delivery_id,
        event_name,
      });
    }

    const newDeliveryStatus = mapEventToDeliveryStatus(event_name);
    const newOrderStatus = mapEventToOrderStatus(event_name);

    // 4) Construir updates
    const deliveryUpdateData = pickDefined({
      status: newDeliveryStatus ?? undefined,
      trackingUrl: event.tracking_url ?? undefined,

      deliveryFee: typeof event.fee === "number" ? event.fee / 100 : undefined,
      tipAmount: typeof event.tip === "number" ? event.tip / 100 : undefined,
      currency: event.currency ?? undefined,

      driverName: event.dasher_name ?? undefined,
      driverPhone:
        event.dasher_dropoff_phone_number ??
        event.dasher_pickup_phone_number ??
        undefined,

      pickupAddress: event.pickup_address ?? undefined,
      dropoffAddress: event.dropoff_address ?? undefined,

      dropoffName:
        (event.dropoff_contact_given_name || event.dropoff_contact_family_name)
          ? `${event.dropoff_contact_given_name || ""}${
              event.dropoff_contact_family_name
                ? ` ${event.dropoff_contact_family_name}`
                : ""
            }`.trim()
          : undefined,

      etaPickup: event.pickup_time_estimated
        ? new Date(event.pickup_time_estimated)
        : undefined,

      etaDropoff: event.dropoff_time_estimated
        ? new Date(event.dropoff_time_estimated)
        : undefined,

      deliveredAt: event.dropoff_time_actual
        ? new Date(event.dropoff_time_actual)
        : undefined,

      // ✅ guardar todo el webhook
      rawResponse: event,
    });

    // 5) Update en transacción (delivery + order)
    const result = await prisma.$transaction(async (tx) => {
      const updatedDelivery = await tx.delivery.update({
        where: { id: delivery.id },
       data: {
      ...deliveryUpdateData,
          ...(FINAL_DELIVERY.has(delivery.status)
            ? { status: delivery.status }
            : {}),
    },

      });

      let updatedOrder = delivery.order;

      // ✅ solo cambia status si:
      // - existe order
      // - tenemos mapeo
      // - y NO está en un estado final que no quieres pisar
      //   (ej: si ya está COMPLETED, no lo regreses a PROCESSING)
  
const FINAL_ORDER = new Set(["COMPLETED", "CANCELLED", "REFUNDED", "FAILED"]);
      if (
        updatedOrder &&
        newOrderStatus &&
        !FINAL_ORDER.has(updatedOrder.status) &&
        newDeliveryStatus !== "CANCELLED" // 👈 no tocar orden en cancelación
      ) {
        updatedOrder = await tx.order.update({
          where: { id: updatedOrder.id },
          data: { status: newOrderStatus },
        });
      }

      return { updatedDelivery, updatedOrder };
    });

    // Si el delivery pasó a CANCELLED y antes no lo estaba → notificar al admin
    if (
      newDeliveryStatus === "CANCELLED" &&
      delivery.status !== "CANCELLED"
    ) {
      try {
        await sendAdminDeliveryCancelledNotification(
          { sendEmail: sendEmailFn },
          {
            order: result.updatedOrder || delivery.order,
            delivery: result.updatedDelivery,
          }
        );
      } catch (emailErr) {
        console.warn(
          "[DoorDash Webhook] Failed to send admin cancellation email:",
          emailErr?.message
        );
      }
    }

    // 6) Respuesta útil para Postman
    return res.status(200).json({
      success: true,
      received: true,
      event_name,
      external_delivery_id,
      before: {
        deliveryStatus: delivery.status,
        orderStatus: delivery.order?.status ?? null,
      },
      after: {
        deliveryStatus: result.updatedDelivery.status,
        orderStatus: result.updatedOrder?.status ?? null,
      },
    });
  } catch (error) {
    console.error("[DoorDash Webhook] Error handling webhook:", error);
    return res.status(500).json({
      success: false,
      message: "Webhook processing error",
      error: error?.message,
    });
  }
};

module.exports = { handleDoorDashWebhook };
