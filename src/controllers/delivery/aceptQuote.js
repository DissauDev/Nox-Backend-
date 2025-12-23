const { runDeliveryCheckout } = require("./services/checkout/checkoutService");
const { toPublicError } = require("./services/errors/normalize");

const acceptDeliveryQuoteAndCreateOrder = async (req, res) => {
  try {
    const result = await runDeliveryCheckout(req.body);

    // Si ya estaba procesada por idempotencia, puedes devolver 200 o 201.
    return res.status(result.alreadyProcessed ? 200 : 201).json({
      success: true,
      order: result.order,
      delivery: result.delivery,
      alreadyProcessed: result.alreadyProcessed,
    });
  } catch (err) {
    console.log(err);
    const e = toPublicError(err);
    return res.status(e.status || 500).json({
      success: false,
      code: e.code || "ERROR",
      message: e.message || "Server error",
      details: e.details,
    });
  }
};

module.exports = { acceptDeliveryQuoteAndCreateOrder };
