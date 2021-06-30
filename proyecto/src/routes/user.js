const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// Rutas
router.get('/login', userController.login);
router.get('/register', userController.register);
router.get('/resetPassword', userController.resetPassword);

module.exports = router;