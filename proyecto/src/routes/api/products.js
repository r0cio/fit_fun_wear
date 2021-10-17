const express = require('express');
//const multer = require('multer');
const router = express.Router();
//const { check } = require('express-validator');

//const upload = multer({ storage });

// Controlador de productos
const adminProductController = require('../../controllers/api/adminProductController_2');

const loggedAdminMiddleware = require('../../middlewares/loggedAdminMiddleware');


/* Rutas */


// listado de todos los productos
//router.get('/', loggedAdminMiddleware, adminProductController.products);
router.get('/', adminProductController.products);

// detalle de un producto
//router.get('/:id', loggedAdminMiddleware, adminProductController.detalle);
//router.get('/:id', loggedAdminMiddleware, adminProductController.detail);

// listado de los atributos de un producto
//router.get('/:id/attributes', loggedAdminMiddleware, adminAttributeController.index);


module.exports = router;