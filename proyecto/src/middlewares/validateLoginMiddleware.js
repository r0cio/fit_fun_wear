// ************ Express validator Require ************
const {body} = require("express-validator");
const path = require('path');
// ************ Validations ************
const validationsLogin = [

    body("password").
        notEmpty().withMessage("Escribe tu password").bail()
        .isLength({ min: 8}).withMessage("La longitud mínima es de 8 caracteres").bail(),
    body("emailUsuario")
        .notEmpty().withMessage("Escribe tu correo electrónico").bail()
        .isEmail().withMessage("El formato debe ser válido")
];

module.exports = validationsLogin;