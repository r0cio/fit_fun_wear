const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');

// Rutas
router.get('/', mainController.index);
router.get('/privacidad', mainController.privacidad);
router.get('/legal', mainController.legal);
router.get('/terminos', mainController.terminos);
router.get('/faq', mainController.faq);
router.get('/about', mainController.about);
router.get('/contacto', mainController.contact);

module.exports = router;