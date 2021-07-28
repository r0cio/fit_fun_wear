// ************ Express validator Require ************
const {body, validationResult} = require("express-validator");
const path = require('path');
// ************ Validations ************
const validations = [
    body("fullName")
        .notEmpty().withMessage("Escribe tu nombre").bail()
        .isLength({ min: 3}).withMessage("La longitud mínima es de 3 caracteres").bail()
        .isAlpha().withMessage("Debe haber solo caracteres del alfabeto"),
    body("password").notEmpty().withMessage("Escribe tu password"),
    body("email")
        .notEmpty().withMessage("Escribe tu correo electrónico").bail()
        .isEmail().withMessage("El formato debe ser válido"),
    body("edad")
        .optional({checkFalsy: true})
        .isInt({ min: 6, max: 110 })
        .withMessage("Escribe un número entero mayor que 6 y menor que 110"),
    body("color").notEmpty().withMessage("Selecciona un color"),
    body("avatar").custom((value, {req}) => {
        let file = req.file;

        let acceptedExtensions = ['.jpg', '.png' ,'.gif', '.jpeg' ];
        if(!file){
            throw new Error('Tienes que subir una imagen');
        } else {
            let fileExtension = path.extname(file.originalname);
            if(!acceptedExtensions.includes(fileExtension)){
                throw new Error(`Las extensiones de archivos permitidas son: ${acceptedExtensions.join(', ')}`);
            }
        }
        return true;
    })
];

module.exports = validations;