// ************ Express validator Require ************
const {validationResult} = require("express-validator");
const bycrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const User = require('../models/User');
const date = Date.now();

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
        let userToLogin = User.findByField('email', req.body.email);        
        if( userToLogin) {
            let correctPassword = bycrypt.compareSync(req.body.password, userToLogin.password);
            if (correctPassword) {
                delete userToLogin.password;
                req.session.userLogged = userToLogin;
                if( req.body.recordame){
                    res.cookie("userEmail", req.body.email, {maxAge: 1000 * 60});
                }
                return res.redirect('/user/profile');
            }  
            return res.render('user/login', {
                errors: {
                    email: {
                        msg: 'Los datos no son correctos'
                    },
                    password: {
                        msg: 'Los datos no son correctos'
                    }
                }               
            });          
        }
        return res.render('user/login', {
            errors: {
                email: {
                    msg: 'No se encuentra este email en nuestra base de datos'
                }
            },
            oldData: req.body,
        });

    },

    register: function (req , res ) {
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
        let userToCreate = {}
        if (req.file == undefined) { // Sino se agrega una imagen de perfil se agrega una por default.
            userToCreate = {
                ...req.body,
                password: bycrypt.hashSync(req.body.password, 10),
                category: 'user',
                imagen: 'default-image.png',
            };
        } else {  // En caso contrario se agrega la imagen que sube el usuario.
            userToCreate = {
                ...req.body,
                password: bycrypt.hashSync(req.body.password, 10),
                category: 'user',
                imagen: req.file.filename,
            };

        }

        let userCreated = User.create(userToCreate);
		return res.render('user/login', { msgSuccess: 'Te has registrado con éxito'});
    },

    resetPassword: function (req, res) {
        res.render('user/reset-password');
    },

    logout: function (req, res) {
        req.session.destroy();
        return res.redirect('/');
    },

    profile: (req, res) => {
        return res.render('user/profile', {
            user: req.session.userLogged
        });
    }

};

module.exports = userController;