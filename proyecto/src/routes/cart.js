const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cartController');

// Rutas
router.get('/', cartController.index);
console.log("llegue aqui");
router.get('/sacarItem', cartController.sacarItem);
router.get('/consultarItem', cartController.consultarItem);
router.get('/agregarItem', cartController.agregarItem);

module.exports = router;