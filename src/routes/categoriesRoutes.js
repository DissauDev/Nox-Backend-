const express = require('express');
const router = express.Router();

  const {
    authenticateBearer,
    requireAdminOrEmployee,
  
  } = require("../middlewares/authMiddleware");


const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getCategoriesWithSales,
  getCategoriesAvailable,
  updateCategoryStatus,
  getAvailableCarouselCategories,
  updateCategorySortOrder
} = require('../controllers/categoryControllers');


router.post('/categories',authenticateBearer,requireAdminOrEmployee, createCategory);


router.get('/categories/available', getCategoriesAvailable);


router.get('/categories', getCategories);

router.get('/categories-with-sales', getCategoriesWithSales);

router.get('/categories/:id', getCategoryById);

router.put('/categories/:id',authenticateBearer,requireAdminOrEmployee, updateCategory);


router.patch('/categories/:id/status',authenticateBearer,requireAdminOrEmployee, updateCategoryStatus);

router.delete('/categories/:id',authenticateBearer,requireAdminOrEmployee, deleteCategory);

router.get('/categories-available-carousel', getAvailableCarouselCategories);

/**
 * @openapi
 * /api/categories/{id}/sort-order:
 *   patch:
 *     summary: Actualiza el orden de una categoría
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategorySortOrderUpdate'
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: No encontrada
 */
router.patch('/categories/:id/sort-order', updateCategorySortOrder);

module.exports = router;
