// ************ Express validator Require ************
const {body} = require("express-validator");
const path = require('path');
// ************ Validations ************
const validations = [
    body("nombre")
        .notEmpty().withMessage("Escribe tu nombre").bail()
        .isLength({ min: 3}).withMessage("La longitud mínima es de 3 caracteres").bail(),
        /* .isAlpha().withMessage("Debe haber solo caracteres del alfabeto"), */
    body("apellido")
        .notEmpty().withMessage("Escribe tu nombre").bail()
        .isLength({ min: 3}).withMessage("La longitud mínima es de 3 caracteres").bail(),
        /* .isAlpha().withMessage("Debe haber solo caracteres del alfabeto"), */
    body("password").
        notEmpty().withMessage("Escribe tu password").bail()
        .isLength({ min: 8}).withMessage("La longitud mínima es de 8 caracteres"),
    body("email")
        .notEmpty().withMessage("Escribe tu correo electrónico").bail()
        .isEmail().withMessage("El formato debe ser válido"),
    body("terminos").notEmpty().withMessage('Debes aceptar la política de privacidad y los términos de uso para continuar'),
        
        
    body("imagen").custom((value, {req}) => {
        let file = req.file;

        let acceptedExtensions = ['.jpg', '.png' ,'.gif', '.jpeg', '.svg', '.bmp', '.tiff' ];
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