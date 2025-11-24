const express = require('express');
const {
  getDashboardStats,
  getProductAnalytics,
  getPerformance,
  getCategorySales,
  getSalesTrend
} = require('../controllers/analyticsControllers');

const router = express.Router();


router.get('/analytics/performance', getPerformance);


router.get('/analytics/categories-sales', getCategorySales);

router.get('/analytics/overview', getDashboardStats);

router.get('/analytics/products', getProductAnalytics);

router.get('/analytics/sales-trend', getSalesTrend);

module.exports = router;
