const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require("path");
const { check } = require('express-validator');

// Controlador de atributos
const adminAttributeController = require('../controllers/attributeController');

const loggedAdminMiddleware = require('../middlewares/loggedAdminMiddleware');

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

// Validación para el formulario de creación de un atributo
const validaciones = [
    check('categoria').notEmpty().withMessage('Debes elegir al menos 1 categoria'),
    check('genero').notEmpty().withMessage('Elige un genero'),
    check('disponible').notEmpty().withMessage('Debes especificar si el producto estará disponible o no'),
    check('color').notEmpty().withMessage('Debes elegir un color'),
    check('talla').notEmpty().withMessage('Debes elegir una talla'),
    check('precio').notEmpty().withMessage('Tienes que especificar un precio').bail().isInt().withMessage('El precio tiene que ser un número'),
    check('descuento').optional({ checkFalsy: true }).isInt().withMessage('Debes escribir un número entero'),
    check('cantidad').notEmpty().withMessage('Debes asignar una cantidad de productos')
    
];

/* Rutas */

// listado de todos los atributos
router.get('/:id', loggedAdminMiddleware, adminAttributeController.index);
//router.get('/:id',  adminAttributeController.index);

// página de administrador
//router.get('/products-admin', adminProductController.admin);

// obtener el formulario de creación de atributos
router.get('/create/:id', loggedAdminMiddleware, adminAttributeController.add);
//router.get('/create/:id',  adminAttributeController.add);

// acción de creación, donde se envía el formulario de creación de atributos
router.post('/create/:id', upload.single('imagen'), validaciones, loggedAdminMiddleware, adminAttributeController.store);
//router.post('/create/:id', upload.single('imagen'), validaciones, adminAttributeController.store);

// detalle de un producto
//router.get('/product-detail/:id', adminProductController.detalle);

// formulario de edición de atributos
router.get('/edit/:id', loggedAdminMiddleware, adminAttributeController.edit);
//router.get('/edit/:id',  adminAttributeController.edit);

// acción de edición, donde se envía el formulario de edición de atributos
router.put('/edit/:id', upload.single('imagen'), validaciones, adminAttributeController.update);
//router.put('/edit/:id', upload.single('imagen'), validaciones, adminAttributeController.update);

// acción de borrado de un atributos
router.delete('/delete/:id', loggedAdminMiddleware, adminAttributeController.delete);
//router.delete('/delete/:id',  adminAttributeController.delete);

module.exports = router;