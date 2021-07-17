const express = require('express');
const router = express.Router();

// Controlador de productos
const productController = require('../controllers/productController');

/* Rutas */

// listado de todos los productos
router.get('/', productController.index);

// página de administrador
router.get('/products-admin', productController.admin);

// obtener el formulario de creación de productos
router.get('/create', productController.add);

// acción de creación, donde se envía el formulario de creación de productos
router.post('/', productController.store);

// detalle de un producto
router.get('/product-detail/:id', productController.detalle);

// formulario de edición de productos
router.get('/edit/:id', productController.edit);

// acción de edición, donde se envía el formulario de edición de productos
router.put('/:id', productController.update);

// acción de borrado de un producto
router.delete('/delete/:id', productController.delete);

module.exports = router;