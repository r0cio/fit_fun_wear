const express = require('express');
const router = express.Router();

// Controlador de productos
const productController = require('../controllers/productController');

/* Rutas */

// listado de todos los productos
router.get('/', productController.index);

// obtener el formulario de creación de productos
router.get('/create');

// acción de creación, donde se envía el formulario de creación de productos
router.post('/');

// detalle de un producto
router.get('/product-detail/:id', productController.detalle);

// formulario de edición de productos
router.get('/:id/edit');

// acción de edición, donde se envía el formulario de edición de productos
router.put('/:id');

// acción de borrado de un producto
router.delete('/:id');

module.exports = router;