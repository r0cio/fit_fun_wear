const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const userController = require('../controllers/userController');

// ************ Middlewares ************
const validations = require('../middlewares/validateRegisterMiddleware');
const validationsLogin = require('../middlewares/validateLoginMiddleware');

// ************ Se muestra el formulario de login ************
router.get('/login', userController.login);

// ************ Se procesa el formulario de login ************
router.post('/login', validationsLogin, userController.loginProcess);

//************ Se muestra el formulario del registro ************
router.get('/register', userController.register);

// ************ Guarda en la DB al usuario registrado ************
router.post('/register',validations, userController.store); 

router.get('/reset-password', userController.resetPassword);

module.exports = router;