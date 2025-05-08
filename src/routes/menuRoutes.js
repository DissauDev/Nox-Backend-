const express = require('express');
const router = express.Router();
const { getMenu } = require('../controllers/menuController');

router.get('/menu', getMenu);

module.exports = router;