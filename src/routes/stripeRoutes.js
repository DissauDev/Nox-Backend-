
// routes/uploadRoutes.js
const express = require('express');
const { createpaymentStripe } = require('../controllers/stripeController');

const router = express.Router();

// Para subir imágenes a Cloudinary
router.post('/',createpaymentStripe );

module.exports = router;
