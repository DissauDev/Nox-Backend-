// src/routes/deliveryRoutes.js
const express = require('express');
const router = express.Router();

const { getDeliveryQuote,cancelDeliveryController } = require('../controllers/delivery/deliveryController');
const { acceptDeliveryQuoteAndCreateOrder } = require('../controllers/delivery/aceptQuote');
const { handleDoorDashWebhook } = require('../controllers/delivery/doordashWebhookController');
// POST /api/delivery/quote

router.post('/delivery/quote', getDeliveryQuote);
router.post('/delivery/accept', acceptDeliveryQuoteAndCreateOrder);
router.post('/webhooks/doordash', handleDoorDashWebhook);
router.post(
  "/deliveries/:orderId/cancel",
  cancelDeliveryController
);



module.exports = router;
