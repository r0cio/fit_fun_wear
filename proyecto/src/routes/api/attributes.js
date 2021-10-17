const express = require('express');
const router = express.Router();
//const multer = require('multer');
//const path = require("path");
const { check } = require('express-validator');

// Controlador de atributos
const adminAttributeController = require('../../controllers/api/attributeController');

const loggedAdminMiddleware = require('../../middlewares/loggedAdminMiddleware');



/* Rutas */

// listado de todos los atributos del producto con id_pridct = id
//router.get('/:id', loggedAdminMiddleware, adminAttributeController.index);
router.get('/:id',  adminAttributeController.index);


// formulario de edición de atributos con id_attribute = id
//router.get('/detalle/:id', loggedAdminMiddleware, adminAttributeController.detail);
router.get('/detail/:id',  adminAttributeController.detalle);



module.exports = router;