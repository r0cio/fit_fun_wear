const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Rutas

// Página de administrador
router.get('/products-admin', adminController.admin);

// Crear un producto
router.get('/add-product', adminController.add);
router.post('/', adminController.store);

// Editar un producto
router.get('/edit-product/', adminController.edit);
router.put('/edit-product/', adminController.update);

module.exports = router;