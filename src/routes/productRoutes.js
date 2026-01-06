
// routes/productRoutes.js
const express = require('express');
const {
    createProduct,
    getAllProducts,
    updateProduct,
    getProductById,
    getProductSuggestions,
    deleteProduct,
    updateProductStatus,
    updateProdSortOrder
  } = require('../controllers/productsController');
  const {
  setProductOptions,
  getProductOptions
  } = require('../controllers/productOptionsController');


  const {
    authenticateBearer,
    requireAdminOrEmployee,
  
  } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post('/products',authenticateBearer,requireAdminOrEmployee, createProduct);
router.get('/products',authenticateBearer,requireAdminOrEmployee, getAllProducts);
router.get('/products/:id', getProductById);
router.put('/products/:id',authenticateBearer,requireAdminOrEmployee, updateProduct);
router.delete('/products/:id',authenticateBearer,requireAdminOrEmployee, deleteProduct);
router.patch('/products/:id/status',authenticateBearer,requireAdminOrEmployee,updateProductStatus);
router.get("/products/:id/suggestions", getProductSuggestions);


router.post('/products/:id/options',setProductOptions);
router.get('/products/:id/options',    getProductOptions);
router.patch('/products/:id/sort-order',updateProdSortOrder );

module.exports = router;
 