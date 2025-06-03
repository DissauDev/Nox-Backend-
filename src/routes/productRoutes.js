
// routes/productRoutes.js
const express = require('express');
const {
    createProduct,
    getAllProducts,
    updateProduct,
    getProductById,
    getProductSuggestions,
    deleteProduct,
    updateProductStatus
  } = require('../controllers/productsController');
  const {
  setProductOptions,
  getProductOptions
  } = require('../controllers/productOptionsController');

const router = express.Router();

router.post('/products', createProduct);
router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);
router.patch('/products/:id/status',   updateProductStatus);
router.post('/products/:id/options',   setProductOptions);
router.get('/products/:id/options',    getProductOptions);
router.get("/products/:id/suggestions", getProductSuggestions);

module.exports = router;
