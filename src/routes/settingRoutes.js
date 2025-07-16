const express = require('express');
const router = express.Router();

const { getStoreConfig,updateStoreConfig, createStoreConfig } = require('../controllers/settingsControllers');


router.get('/settings/tax', getStoreConfig);
router.post('/settings/tax',createStoreConfig)
router.put('/settings/tax', updateStoreConfig);

module.exports = router;
