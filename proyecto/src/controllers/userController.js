// ************ Express validator Require ************
const {validationResult} = require("express-validator");

const User = require('../models/User');

const userController = {

    login: function (req, res) {
        res.render('user/login');
    },

    loginProcess: (req, res) => {
        const resultValidation = validationResult(req);
        // Verifica si hay errores
		if( resultValidation.errors.length > 0){
			return res.render('user/login', {
				errors: resultValidation.mapped(),
				oldData: req.body,
			});
		}
        // No hay errores
        // Verifica si el usuario ya está logueado

        return res.send(req.body);
    },

    register: function (req, res) {
        res.render('user/register');
    },

    store: function (req, res) {
		// Se obtienen las validaciones de los campos del formulario
        
		const resultValidation = validationResult(req);
        // Verifica si hay errores
		if( resultValidation.errors.length > 0){
			return res.render('user/register', {
				errors: resultValidation.mapped(),
				oldData: req.body,
			});
		}
        // No hay errores
        // Verifica si el usuario ya está logueado

        let userInDb = User.findByField('email', req.body.email);

        if( userInDb) {
            return res.render('user/register', {
				errors: {
                    email: {
                        msg: 'Este email ya está registrado'
                    }
                },
				oldData: req.body,
			});
        }

		let userToCreate = {

            ...req.body,
            /*
            imagen: req.file.filename
            */
           imagen: 'default.jpg'
        }

        let userCreated = User.create(userToCreate);
		return res.redirect('/user/login');
    },

    resetPassword: function (req, res) {
        res.render('user/reset-password');
    }

};

module.exports = userController;