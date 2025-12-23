const axios = require("axios");
const { createDoorDashJwt } = require("../../../../utils/createDoorDashJwt");
const { isQuoteExpiredError, doorDashErrorMessage } = require("../errors/normalize");
const { HttpError } = require("../errors/httpError");

const { DOORDASH_API_BASE = "https://openapi.doordash.com" } = process.env;

async function acceptQuote({ externalDeliveryId, tip,items, }) {
  const ddJwt = createDoorDashJwt();

   const tipCents = tip == null ? null : Number(tip);

  // ✅ Body final que mandaremos a DoorDash
  const acceptBody = {};

  if (Number.isFinite(tipCents)) {
    acceptBody.tip = tipCents;
  }

  if (Array.isArray(items) && items.length > 0) {
    acceptBody.items = items;   
  }

  
  try {
    const ddResponse = await axios.post(
      `${DOORDASH_API_BASE}/drive/v2/quotes/${encodeURIComponent(externalDeliveryId)}/accept`,
      acceptBody,
      {
        headers: {
          Authorization: `Bearer ${ddJwt}`,
          "Content-Type": "application/json",
        },
      }
    );
    return { ddData: ddResponse.data, acceptBody };
  } catch (err) {
    if (isQuoteExpiredError(err)) {
      throw new HttpError(409, "QUOTE_EXPIRED", "Delivery quote expired. Please get a new quote.", err.response?.data);
    }
    throw new HttpError(err.response?.status || 502, "DOORDASH_ACCEPT_FAILED", doorDashErrorMessage(err), err.response?.data);
  }
}


async function cancelDoorDashDelivery({
  externalDeliveryId,
  // doordashDeliveryId,  // <- lo puedes dejar en la firma si quieres, pero no se usa para Drive
  reasonCode,
  reason,
}) {
  if (!externalDeliveryId) {
    throw new HttpError(
      400,
      "MISSING_DELIVERY_ID",
      "Must provide externalDeliveryId to cancel a Drive delivery."
    );
  }

  const ddJwt = createDoorDashJwt();

  const body = {};

  if (reasonCode) {
    // OJO: en Drive este campo se llama cancellation_reason
    body.cancellation_reason = reasonCode; // ej: "customer_request", "store_closed"
  }
  if (reason) {
    body.cancellation_reason_additional_comment = reason;
  }

  const url = `${DOORDASH_API_BASE}/drive/v2/deliveries/${externalDeliveryId}/cancel`;



  try {
    const resp = await axios.put(url, body, {
      headers: {
        Authorization: `Bearer ${ddJwt}`,
        "Content-Type": "application/json",
      },
    });

    return resp.data;
  } catch (err) {
    const status = err.response?.status || 502;
    const data = err.response?.data;
    const msg = doorDashErrorMessage(err);

    // Si ya está cancelado, lo tratamos como éxito idempotente
    if (status === 409 && data?.code === "delivery_already_cancelled") {
      return { alreadyCancelled: true, raw: data };
    }

    throw new HttpError(status, "DOORDASH_CANCEL_FAILED", msg, data);
  }
}


module.exports = { acceptQuote,cancelDoorDashDelivery }
