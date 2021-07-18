const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require("path");

// Controlador de productos
const productController = require('../controllers/productController');

// Multer para aceptar imagenes en los formulario
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb (null, '../public/img');
    },
    filename: (req, file, cb) => {
        const newFileName = 'product' + Date.now() + path.extname(file.originalname);
        cb (null, newFileName);
    },
});

const upload = multer({ storage });

/* Rutas */

// listado de todos los productos
router.get('/', productController.index);

// página de administrador
router.get('/products-admin', productController.admin);

// obtener el formulario de creación de productos
router.get('/create', productController.add);

// acción de creación, donde se envía el formulario de creación de productos
router.post('/', upload.single('imagen'), productController.store);

// detalle de un producto
router.get('/product-detail/:id', productController.detalle);

// formulario de edición de productos
router.get('/edit/:id', productController.edit);

// acción de edición, donde se envía el formulario de edición de productos
router.put('/:id', productController.update);

// acción de borrado de un producto
router.delete('/delete/:id', productController.delete);

module.exports = router;