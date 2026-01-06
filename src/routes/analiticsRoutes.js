const express = require('express');
const {
  getDashboardStats,
  getProductAnalytics,
  getPerformance,
  getCategorySales,
  getSalesTrend
} = require('../controllers/analyticsControllers');

const router = express.Router();

  const {
    authenticateBearer,
    requireAdminOrEmployee,
  
  } = require("../middlewares/authMiddleware");

router.get('/analytics/performance',authenticateBearer,requireAdminOrEmployee, getPerformance);


router.get('/analytics/categories-sales',authenticateBearer,requireAdminOrEmployee, getCategorySales);

router.get('/analytics/overview',authenticateBearer,requireAdminOrEmployee, getDashboardStats);

router.get('/analytics/products',authenticateBearer,requireAdminOrEmployee, getProductAnalytics);

router.get('/analytics/sales-trend',authenticateBearer,requireAdminOrEmployee, getSalesTrend);

module.exports = router;
