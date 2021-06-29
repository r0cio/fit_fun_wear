const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');

// Rutas
router.get('/', mainController.index);
router.get('/privacidad', mainController.privacidad);
router.get('/legal', mainController.legal);
router.get('/terminos', mainController.terminos);

module.exports = router;