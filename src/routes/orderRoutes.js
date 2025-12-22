const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrders,
  getOrderById,
  getUserOrders,
  refundOrder,
  updateOrder,
  deleteOrder,
  updateOrderStatus,
  convertOrderToPickup
} = require('../controllers/orderController');
const { refundDeliveryOnly } = require("../controllers/delivery/orderRefundController");

router.post('/orders', createOrder);
router.get('/orders', getOrders);
router.get('/orders/user/:email', getUserOrders);
router.get('/orders/:id', getOrderById);
router.put('/orders/:id', updateOrder);
router.post('/orders/:id/refund', refundOrder);
router.patch('/orders/:id/status', updateOrderStatus);


router.post("/orders/:id/refund-delivery", refundDeliveryOnly);
router.delete('/orders/:id', deleteOrder);
router.post("/orders/:id/convert-to-pickup", convertOrderToPickup);

module.exports = router;