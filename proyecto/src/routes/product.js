const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

// Rutas
router.get('/product-detail', productController.detalle);

module.exports = router;