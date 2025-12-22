// controllers/orderRefundController.js
const { prisma } = require("../../lib/prisma");
const { refundPayment } = require("./services/payments/stripe.service"); 


const refundDeliveryOnly = async (req, res) => {
  const { id } = req.params; // orderId

  try {
    const order = await prisma.order.findUnique({
      where: { id },
      include: { delivery: true },
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (order.fulfillmentType !== "DELIVERY") {
      return res.status(400).json({
        success: false,
        message: "Only delivery orders can refund delivery fee.",
      });
    }

    if (!order.delivery) {
      return res.status(400).json({
        success: false,
        message: "Order has no delivery attached.",
      });
    }

    // Opcional/ recomendado: solo dejar refund del delivery si YA está cancelado
    if (order.delivery.status !== "CANCELLED") {
      return res.status(400).json({
        success: false,
        message:
          "Delivery must be CANCELLED before refunding delivery fee.",
      });
    }

    // Evitar doble refund
    if (order.delivery.deliveryRefunded) {
      return res.status(400).json({
        success: false,
        message: "Delivery fee was already refunded for this order.",
      });
    }

    const deliveryFee = order.delivery.deliveryFee || 0;
    const driverTip = order.delivery.tipAmount || 0;

    // decide tu política:
    // - solo deliveryFee
    // - deliveryFee + driverTip
    const amountToRefundUsd = deliveryFee + driverTip;

    if (amountToRefundUsd <= 0) {
      return res.status(400).json({
        success: false,
        message:
          "No delivery amount available to refund (fee and tip are zero).",
      });
    }

    if (!order.stripePaymentIntentId) {
      return res.status(400).json({
        success: false,
        message: "Order has no payment reference to refund.",
      });
    }

    // Stripe espera el monto en centavos
    const amountCents = Math.round(amountToRefundUsd * 100);

    // 🔁 aquí usas tu helper o stripe.refunds.create directo
    await refundPayment({
      paymentIntentId: order.stripePaymentIntentId,
      amount: amountCents,
      reason: "requested_by_customer",
      metadata: {
        refundType: "DELIVERY_ONLY",
        orderId: order.id,
      },
    });

    // Marca en la BD que el delivery ya fue reembolsado
    const updatedDelivery = await prisma.delivery.update({
      where: { id: order.delivery.id },
      data: {
        deliveryRefunded: true, // añade este boolean en tu schema
        deliveryRefundedA: Date.now()
      },
    });

    // Opcional: si tienes estado PARTIALLY_REFUNDED, úsalo.
    // Si no, puedes dejar la orden en PAID / COMPLETED igual.
    return res.status(200).json({
      success: true,
      message: "Delivery fee refunded successfully.",
      delivery: updatedDelivery,
    });
  } catch (error) {
    console.error("Error in refundDeliveryOnly:", error);
    return res.status(500).json({
      success: false,
      message: "Error refunding delivery fee",
      error: error.message,
    });
  }
};

module.exports = { refundDeliveryOnly };
