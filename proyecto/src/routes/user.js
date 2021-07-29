const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const userController = require('../controllers/userController');

// ************ Middlewares ************
const validations = require('../middlewares/validateRegisterMiddleware');
const validationsLogin = require('../middlewares/validateLoginMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const mainController = require('../controllers/mainController');

// ************ Se muestra el formulario de login ************
router.get('/login', guestMiddleware, userController.login);

// ************ Se procesa el formulario de login ************
router.post('/login', validationsLogin, userController.loginProcess);

//************ Se muestra el formulario del registro ************
router.get('/register', guestMiddleware ,userController.register);

// ************ Guarda en la DB al usuario registrado ************
router.post('/register',validations, userController.store); 

router.get('/reset-password', userController.resetPassword);

// ************ Cierra sesión ************
router.get('/logout', userController.logout);

module.exports = router;