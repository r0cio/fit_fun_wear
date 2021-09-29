const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require("path");
const { check } = require('express-validator');

// Controlador de productos
const adminAttributeController = require('../controllers/attributeController');

// Multer para aceptar imagenes en los formulario
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb (null, '../public/img/products');
    },
    filename: (req, file, cb) => {
        const newFileName = 'product' + Date.now() + path.extname(file.originalname);
        cb (null, newFileName);
    },
});

const upload = multer({ storage });

// Validación para el formulario de creación de un producto
const validaciones = [
    check('categoria').notEmpty().withMessage('Debes elegir al menos 1 categoria'),
    check('genero').notEmpty().withMessage('Elige un genero'),
    check('disponible').notEmpty().withMessage('Debes especificar si el producto estará disponible o no'),
    check('color').notEmpty().withMessage('Debes elegir al menos 1 color'),
    check('talla').notEmpty().withMessage('Debes elegir al menos 1 talla'),
    check('precio').notEmpty().withMessage('Tienes que especificar un precio').bail().isInt().withMessage('El precio tiene que ser un número'),
    check('descuento').optional({ checkFalsy: true }).isInt().withMessage('Debes escribir un número entero'),
    check('cantidad').notEmpty().withMessage('Debes asignar una cantidad de productos')
    
];

/* Rutas */

// listado de todos los productos
router.get('/:id', adminAttributeController.index);

// página de administrador
//router.get('/products-admin', adminProductController.admin);

// obtener el formulario de creación de productos
router.get('/create/:id', adminAttributeController.add);

// acción de creación, donde se envía el formulario de creación de atributos
router.post('/create/:id', upload.single('imagen'), validaciones, adminAttributeController.store);

// detalle de un producto
//router.get('/product-detail/:id', adminProductController.detalle);

// formulario de edición de productos
router.get('/edit/:id', adminAttributeController.edit);

// acción de edición, donde se envía el formulario de edición de productos
router.put('/:id', adminAttributeController.update);

// acción de borrado de un producto
router.delete('/delete/:id', adminAttributeController.delete);

module.exports = router;