const axios = require("axios");
const { createDoorDashJwt } = require("../../../../utils/createDoorDashJwt");
const { isQuoteExpiredError, doorDashErrorMessage } = require("../errors/normalize");
const { HttpError } = require("../errors/httpError");

const { DOORDASH_API_BASE = "https://openapi.doordash.com" } = process.env;

async function acceptQuote({ externalDeliveryId, tip }) {
  const ddJwt = createDoorDashJwt();

  const tipCents = tip == null ? null : Number(tip);
  const acceptBody = Number.isFinite(tipCents) ? { tip: tipCents } : {};

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

module.exports = { acceptQuote };
