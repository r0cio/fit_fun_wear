const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require("path");

// ************ Controller Require ************
const userController = require('../controllers/userController');

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

// ************ Middlewares ************
const validations = require('../middlewares/validateRegisterMiddleware');
const validationsLogin = require('../middlewares/validateLoginMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const loggedMiddleware = require('../middlewares/loggedMiddleware');
const mainController = require('../controllers/mainController');

// ************ Se muestra el formulario de login ************
router.get('/login', guestMiddleware, userController.login);

// ************ Se procesa el formulario de login ************
router.post('/login', validationsLogin, userController.loginProcess);

//************ Se muestra el formulario del registro ************
router.get('/register', guestMiddleware, userController.register);

// ************ Guarda en la DB al usuario registrado ************
router.post('/register', upload.single('imagen'), validations, userController.store);

//router.get('/reset-password', userController.resetPassword);

// ************ Cierra sesión ************
router.get('/logout', userController.logout);

// ************ Perfil de usuario ************
router.get('/profile', loggedMiddleware, userController.profile);

// Creación

//router.get("/crear", userController.crear)

//Editar (update)

router.get('/edit/:id', loggedMiddleware, userController.edit);

//Actualizar 
router.put('/edit/:id', upload.single('imagen'), userController.update);


module.exports = router;