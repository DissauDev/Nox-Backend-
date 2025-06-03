const express = require('express');
const router = express.Router();
const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getCategoriesWithSales,
  getCategoriesAvailable,
  updateCategoryStatus,
  getAvailableCarouselCategories
} = require('../controllers/categoryControllers');

router.post('/categories', createCategory);
router.get('/categories/available', getCategoriesAvailable);
router.get('/categories', getCategories);
router.get('/categories-with-sales', getCategoriesWithSales);
router.get('/categories/:id', getCategoryById);
router.put('/categories/:id', updateCategory);
router.patch('/categories/:id/status',   updateCategoryStatus);
router.delete('/categories/:id', deleteCategory);
router.get('/categories-available-carousel', getAvailableCarouselCategories);

module.exports = router;