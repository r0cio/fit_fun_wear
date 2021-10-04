// ************ Express validator Require ************
const { validationResult } = require("express-validator");
const bycrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const User = require('../models/User');
const db = require('../database/models');
const date = Date.now();

const userController = {

    login: function (req, res) {
        res.render('user/login');
    },

    loginProcess: (req, res) => {
        const resultValidation = validationResult(req);
        // Verifica si hay errores
        if (resultValidation.errors.length > 0) {
            return res.render('user/login', {
                errors: resultValidation.mapped(),
                oldData: req.body,
            });
        }
        // No hay errores
        let userToLogin = User.findByField('email', req.body.email);
        if (userToLogin) {
            let correctPassword = bycrypt.compareSync(req.body.password, userToLogin.password);
            if (correctPassword) {
                delete userToLogin.password;
                req.session.userLogged = userToLogin;
                if (req.body.recordarme) {
                    res.cookie("userEmail", req.body.email, { maxAge: 1000 * 60 });
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

    // vista para la creación 

    register: function (req, res) {
        res.render('user/register');
    },

    // guardado en bd (creación)
    store: function (req, res) {
        db.User.create({
            name: req.body.nombre, 
            last_name: req.body.apellido,
            email: req.body.email,
            password: bycrypt.hashSync(req.body.password, 10),
            image: req.file.filename,
            created_at: Date.now(),
            role_id: 2

        });

       // res.render('user/login', { msgSuccess: 'Te has registrado con éxito' });

        
        // Se obtienen las validaciones de los campos del formulario

        const resultValidation = validationResult(req);
        // Verifica si hay errores
        if (resultValidation.errors.length > 0) {
            return res.render('user/register', {
                errors: resultValidation.mapped(),
                oldData: req.body,
            });
        }
        // No hay errores
        // Verifica si el usuario ya está logueado

        let userInDb = User.findByField('email', req.body.email);

        if (userInDb) {
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
                //password: bycrypt.hashSync(req.body.password, 10),
                //category: 'user',
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
        return res.render('user/login', { msgSuccess: 'Te has registrado con éxito' });
    },

    resetPassword: function (req, res) {
        res.render('user/reset-password');
    },

    logout: function (req, res) {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
    },

    profile: (req, res) => {
        return res.render('user/profile', {
            user: req.session.userLogged
        });
    }, 

    /*crear: (req, res) => {
        return res.render('user/profile', {
            user: req.session.userLogged
        });
    }*/

    // Read - Vista 

    // Editar - Vista (Update)
    edit: function (req, res) {
        let id = req.params.id;
        db.User.findByPk(id)
        .then( user => {
            console.log(user);
            //res.render('admin/edit-product', { producto: productoActual });
            res.render('user/edit-profile', { user: user });
        })
        .catch(function (err) {
            console.log(err);
        })
    },

    // actualizar
    update: function (req, res) {
        let id = req.params.id;
        let user = {
            "name": req.body.nombre, 
            "last_name": req.body.apellido,
            "email": req.body.email,
            "password": bycrypt.hashSync(req.body.password, 10),
            "image": req.file.filename,
            "updated_at": Date.now(),
            "role_id": 2
        };
        console.log('user');
        db.User.update(user,{ where: { id_user: id } })
        .then( user => {
            console.log(user);
        })
        .catch(function (err) {
            console.log(err);
        })

        let userToCreate = {}
        if (req.file == undefined) { // Sino se agrega una imagen de perfil se agrega una por default.
            userToCreate = {
                ...req.body,
                //password: bycrypt.hashSync(req.body.password, 10),
                //category: 'user',
                imagen: 'default-image.png',
            };
        } else {  // En caso contrario se agrega la imagen que sube el usuario.
            userToCreate = {
                ...req.body,
                //password: bycrypt.hashSync(req.body.password, 10),
                //category: 'user',
                imagen: req.file.filename,
            };

        }

        let userCreated = User.create(userToCreate);
        res.redirect('/user/edit/' + id);
    
    }

    /*

    //Editar - Vista (Update)
    edit: function (req, res){
        db.User.findByPk(req.params.id)
        .then(function(user){
            res.render("user/edit-profile", {user: user});
        })
        .catch(function (err) {
            console.log(err);
        })
    },

    update: function (req, res){
        
        db.User.update({
            "name": req.body.nombre, 
            "last_name": req.body.apellido,
            "email": req.body.email,
            "password": 1,
            "image": 1,
            //created_at: Date.now(),
            "role_id": 2,
            "updated_at": Date.now()
        }, {
            where: {
                id_user: req.params.id
            }
        });

        res.redirect('/user/edit/'+ req.params.id);
    } */

};

module.exports = userController;