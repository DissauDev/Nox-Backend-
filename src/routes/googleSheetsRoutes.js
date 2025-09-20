
// routes/productRoutes.js
const express = require('express');
const {
 importGoogleSheet
 
  } = require('../controllers/googleSheetController');
//

  const {
  exportCsvPost,
} = require('../controllers/exportProductsCsv');


const router = express.Router();

router.post('/googleSheet/import', importGoogleSheet);


// POST para pruebas con Postman (body JSON con filtros)
router.post('/googleSheet/export.csv', exportCsvPost);

module.exports = router;
 