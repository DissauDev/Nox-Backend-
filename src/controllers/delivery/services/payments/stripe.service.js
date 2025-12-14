const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { HttpError } = require("../errors/httpError");

async function authorizePayment({
  checkoutRequestId,
  amountUsd,
  paymentMethodId,
  shipping,
  metadata,
}) {
  const amountCents = Math.round(Number(amountUsd) * 100);

  const pi = await stripe.paymentIntents.create(
    {
      amount: amountCents,
      currency: "usd",
      payment_method: paymentMethodId,
      confirm: true,
      capture_method: "manual",
      automatic_payment_methods: { enabled: true, allow_redirects: "never" },
      payment_method_options: { card: { request_three_d_secure: "automatic" } },
      metadata,
      shipping,
    },
    {
      // ✅ idempotencia Stripe para que doble click NO cree 2 intents
      idempotencyKey: `auth:${checkoutRequestId}`,
    }
  );

  if (pi.status !== "requires_capture") {
    // no quedó autorizado
    throw new HttpError(402, "PAYMENT_NOT_AUTHORIZED", "Payment could not be authorized.", {
      status: pi.status,
    });
  }

  return pi;
}

async function capturePayment({ checkoutRequestId, paymentIntentId }) {
  return stripe.paymentIntents.capture(
    paymentIntentId,
    undefined,
    {
      idempotencyKey: `cap:${checkoutRequestId}`,
    }
  );
}

async function cancelPayment(paymentIntentId) {
  try {
    await stripe.paymentIntents.cancel(paymentIntentId);
  } catch {
    // no-op: cancelar un PI ya capturado fallará, y está bien
  }
}

module.exports = {
  authorizePayment,
  capturePayment,
  cancelPayment,
};
