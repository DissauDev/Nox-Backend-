const express = require('express');
const router = express.Router();

const {
  authenticateBearer,
  requireAdminOrEmployee,

} = require("../middlewares/authMiddleware");


const { getStoreConfig,updateStoreConfig,
     createStoreConfig } = require('../controllers/settingsControllers');


router.get('/settings/tax', getStoreConfig);
router.post('/settings/tax',authenticateBearer,requireAdminOrEmployee, createStoreConfig)
router.put('/settings/tax',authenticateBearer,requireAdminOrEmployee, updateStoreConfig);

module.exports = router;
