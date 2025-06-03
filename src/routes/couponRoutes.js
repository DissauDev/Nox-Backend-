const express = require('express');
const router = express.Router();
const {
  createCoupon,
  getCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
  redeemCoupon
} = require('../controllers/couponController');

// CRUD de cupones
router.post('/coupons',         createCoupon);
router.get('/coupons',          getCoupons);
router.get('/coupons/:id',      getCouponById);
router.put('/coupons/:id',      updateCoupon);
router.delete('/coupons/:id',   deleteCoupon);

// Redención de cupones
router.post('/coupons/redeem',  redeemCoupon);

module.exports = router;
