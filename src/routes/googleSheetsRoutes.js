
// routes/productRoutes.js
const express = require('express');
const {
 importGoogleSheet
 
  } = require('../controllers/googleSheetController');


const router = express.Router();

router.post('/googleSheet/import', importGoogleSheet);


module.exports = router;
 