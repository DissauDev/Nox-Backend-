const axios = require("axios");

const URL = "http://localhost:3000/api/webhooks/doordash";
const AUTH = "Bearer my-secret";
const external_delivery_id = "quote_1765661587072_9f99si";

async function send(event_name, extra = {}) {
  const payload = { event_name, external_delivery_id, ...extra };
  const res = await axios.post(URL, payload, {
    headers: { Authorization: AUTH, "Content-Type": "application/json" },
  });
  console.log(event_name, res.status, res.data);
}

(async () => {
  await send("DASHER_CONFIRMED", { dasher_name: "Test Dasher" });
  await send("DASHER_PICKED_UP", { pickup_time_actual: new Date().toISOString() });
  await send("DASHER_DROPPED_OFF", { dropoff_time_actual: new Date().toISOString() });
})().catch(console.error);
