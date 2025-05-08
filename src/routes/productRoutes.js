
// routes/productRoutes.js
const express = require('express');
const {
    createProduct,
    getAllProducts,
    updateProduct,
    getProductById,
    deleteProduct
  } = require('../controllers/productsController');

const router = express.Router();

router.post('/products', createProduct);
router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

module.exports = router;
