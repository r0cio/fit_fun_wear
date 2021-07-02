const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cartController');

// Rutas
router.get('/index', cartController.index);
router.get('/sacarItem/:id', cartController.sacarItem);
console.log("llegue aqui");
router.get('/consultarItem', cartController.consultarItem);
router.get('/agregarItem', cartController.agregarItem);

module.exports = router;