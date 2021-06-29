const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

// Rutas
router.get('/', productController.detalle);

module.exports = router;