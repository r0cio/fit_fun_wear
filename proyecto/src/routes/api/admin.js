const express = require('express');
const multer = require('multer');
const router = express.Router();
const { check } = require('express-validator');

// Multer para aceptar la imagen en el formulario de registro
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../public/img/users');
    },
    filename: (req, file, cb) => {
        const newFileName = 'user' + Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    },
});

const upload = multer({ storage });

// Controlador de productos
const adminProductController = require('../../controllers/api/adminProductController');

const loggedAdminMiddleware = require('../../middlewares/loggedAdminMiddleware');

// Validación para el formulario de creación de un producto
const validaciones = [
    check('nombre').notEmpty().withMessage('Debes escribir un nombre para el producto'),
    check('descripcion').notEmpty().withMessage('Debes escribir una descripción para el producto'),
    check('modelo').notEmpty().withMessage('Debes escribir un modelo para el producto'),
];

/* Rutas */

// pagina principal admin
//router.get('/', loggedAdminMiddleware, adminProductController.index);

// listado de todos los usuarios
router.get('/', adminProductController.users);

// detalle de los usuarios
router.get('/:id', adminProductController.usersDetail);

// ver el formulario de edicion de un usuario
//router.get('/edit/user/:id', loggedAdminMiddleware, adminProductController.editUser);

// accion de edicion de un usuario por parte del admin
//router.put('/user/edit/:id', loggedAdminMiddleware, upload.single('imagen'), adminProductController.updateUser);

// eliminar un usuario
//router.delete('/user/delete/:id', loggedAdminMiddleware, adminProductController.deleteUser);

module.exports = router;