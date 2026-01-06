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

  const {
    authenticateBearer,
    requireAdminOrEmployee,
  
  } = require("../middlewares/authMiddleware");

router.post('/orders',createOrder);
router.get('/orders',authenticateBearer, requireAdminOrEmployee, getOrders);
router.get('/orders/user/:email',authenticateBearer, getUserOrders);
router.get('/orders/:id', getOrderById);
router.put('/orders/:id',authenticateBearer,requireAdminOrEmployee, updateOrder);
router.post('/orders/:id/refund',authenticateBearer, requireAdminOrEmployee, refundOrder);
router.patch('/orders/:id/status', authenticateBearer,requireAdminOrEmployee, updateOrderStatus);


router.post("/orders/:id/refund-delivery",authenticateBearer,requireAdminOrEmployee, refundDeliveryOnly);
router.delete('/orders/:id',authenticateBearer,requireAdminOrEmployee, deleteOrder);
router.post("/orders/:id/convert-to-pickup",authenticateBearer,requireAdminOrEmployee, convertOrderToPickup);

module.exports = router;