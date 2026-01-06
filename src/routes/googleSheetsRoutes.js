
// routes/productRoutes.js
const express = require('express');

  const {
    authenticateBearer,
    requireAdminOrEmployee,
  
  } = require("../middlewares/authMiddleware");

const {
 importGoogleSheet
 
  } = require('../controllers/importGoogleSheet.js');
//

  const {
  exportCsvPost,
} = require('../controllers/exportProductsCsv');


const router = express.Router();

router.post('/googleSheet/import',authenticateBearer,requireAdminOrEmployee, importGoogleSheet);


// POST para pruebas con Postman (body JSON con filtros)
router.post('/googleSheet/export.csv',authenticateBearer,requireAdminOrEmployee, exportCsvPost);

module.exports = router;
 