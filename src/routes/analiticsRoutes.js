// routes/analytics.js
const express = require('express')
const { getDashboardStats, getProductAnalytics,
     getPerformance,
     getCategorySales,getSalesTrend } = require('../controllers/analyticsControllers')
const router = express.Router()

// Ejemplo: GET /api/analytics/overview?period=Week
router.get('/analytics/overview', getDashboardStats);
router.get('/analytics/products', getProductAnalytics);
router.get('/analytics/categories-sales', getCategorySales);
router.get('/analytics/sales-trend', getSalesTrend);
router.get('/analytics/performance', getPerformance)

module.exports = router
