const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

// Controlador de productos
const adminProductController = require('../controllers/adminProductController');

// Validación para el formulario de creación de un producto
const validaciones = [
    check('nombre').notEmpty().withMessage('Debes escribir un nombre para el producto'),
    check('descripcion').notEmpty().withMessage('Debes escribir una descripción para el producto'),
    check('modelo').notEmpty().withMessage('Debes escribir un modelo para el producto'),
    /*
    check('categoria').notEmpty().withMessage('Debes elegir al menos 1 categoria'),

    check('genero').notEmpty().withMessage('Elige un genero'),
    check('disponible').notEmpty().withMessage('Debes especificar si el producto estará disponible o no'),
    check('color').notEmpty().withMessage('Debes elegir al menos 1 color'),
    check('talla').notEmpty().withMessage('Debes elegir al menos 1 talla'),
    check('precio').notEmpty().withMessage('Tienes que especificar un precio').bail().isInt().withMessage('El precio tiene que ser un número'),
    check('descuento').optional({ checkFalsy: true }).isInt().withMessage('Debes escribir un número entero'),
    check('cantidad').notEmpty().withMessage('Debes asignar una cantidad de productos')
    */
];

/* Rutas */

// listado de todos los productos
router.get('/', adminProductController.index);

// página de administrador
//router.get('/products-admin', adminProductController.admin);

// obtener el formulario de creación de productos
router.get('/create', adminProductController.add);

// acción de creación, donde se envía el formulario de creación de productos
router.post('/', validaciones, adminProductController.store);

// detalle de un producto
//router.get('/product-detail/:id', adminProductController.detalle);

// formulario de edición de productos
router.get('/edit/:id', adminProductController.edit);

// acción de edición, donde se envía el formulario de edición de productos
router.put('/:id', adminProductController.update);

// acción de borrado de un producto
router.delete('/delete/:id', adminProductController.delete);

module.exports = router;