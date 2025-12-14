const { HttpError } = require("./httpError");

function isAxiosError(err) {
  return !!err?.isAxiosError || !!err?.response;
}

function doorDashErrorMessage(err) {
  const data = err?.response?.data;
  return data?.message || data?.error || "DoorDash request failed";
}

function isQuoteExpiredError(err) {
  const status = err?.response?.status;
  const data = err?.response?.data || {};
  const msg = String(data?.message || data?.error || "").toLowerCase();
  const code = String(data?.code || "").toLowerCase();

  // DoorDash típico: 400 + { code:"validation_error", message:"Quote Expired" }
  return (
    status === 400 &&
    (msg.includes("quote expired") || (code === "validation_error" && msg.includes("expired")))
  );
}

function toPublicError(err) {
  // Ya es HttpError
  if (err instanceof HttpError) return err;

  // ✅ Caso especial: Quote Expired
  if (isAxiosError(err) && isQuoteExpiredError(err)) {
    return new HttpError(
      409,
      "QUOTE_EXPIRED",
      "Delivery quote expired. Please get a new quote.",
      err.response?.data
    );
  }

  // DoorDash Axios error genérico
  if (isAxiosError(err)) {
    const status = err.response?.status || 502;

    // Si DoorDash manda un code propio, úsalo para debug / frontend
    const upstreamCode = err.response?.data?.code;
    const code = upstreamCode ? `DOORDASH_${String(upstreamCode).toUpperCase()}` : "UPSTREAM_ERROR";

    return new HttpError(
      status,
      code,
      doorDashErrorMessage(err),
      err.response?.data
    );
  }

  return new HttpError(500, "SERVER_ERROR", err?.message || "Server error");
}

module.exports = {
  isQuoteExpiredError,
  doorDashErrorMessage,
  toPublicError,
};
