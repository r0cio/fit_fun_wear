const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');

// Rutas
router.get('/products-admin', adminController.admin);
router.get('/add-product', adminController.add);
router.get('/edit-product', adminController.edit);

module.exports = router;