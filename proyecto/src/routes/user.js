const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const userController = require('../controllers/userController');

// ************ Middlewares ************
const validations = require('../middlewares/validateRegisterMiddleware');

// Rutas
router.get('/login', userController.login);
router.get('/register', userController.register);
// ************ Guarda el formulario ************
router.post('/register',validations, userController.store); 

router.get('/reset-password', userController.resetPassword);

module.exports = router;