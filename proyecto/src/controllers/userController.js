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

    //login vista
    login: function (req, res) {
        res.render('user/login');
    },

    loginProcess: (req, res) => {
        // Verifica si hay errores
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            return res.render('user/login', {
                errors: resultValidation.mapped(),
                oldData: req.body,
            });
        }

        // Si no hay errores
        db.User.findAll({
            where: {
                email: req.body.email
            }
        })
            .then(user => {
                if (user.length != 0) {
                    //res.send(user[0].password);
                    let correctPassword = bycrypt.compareSync(req.body.password, user[0].password);
                    if (correctPassword) {
                        delete user[0].password;                        
                        let user2 = user[0];                        
                        req.session.userLog = user2;                        
                        if (req.body.recordarme) {
                            res.cookie("userEmail", req.body.email, { maxAge: (1000 * 60) * 5 });
                        }
                        return res.render('user/profile', { user: user[0] });
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
                } else {
                    return res.render('user/login', {
                        errors: {
                            email: {
                                msg: 'No se encuentra este email en nuestra base de datos'
                            }
                        },
                        oldData: req.body,
                    });
                }
            })
            .catch(err => console.log(err))

    },

    // vista para la creación de usuarios
    register: function (req, res) {
        res.render('user/register');
    },

    // guardado en bd (creación)
    store: function (req, res) {

        // Se obtienen las validaciones de los campos del formulario
        const resultValidation = validationResult(req);
        // Verifica si hay errores
        if (resultValidation.errors.length > 0) {
            return res.render('user/register', {
                errors: resultValidation.mapped(),
                oldData: req.body,
            });
        }

        // Si no se sube una imagen se deja la imagen por defecto
        let imagen = 'default-image.png';
        if (req.file) {
            imagen = req.file.filename;
        }

        // Se comprueba si se quiere registrar un correo existente
        db.User.findAll({
            where: { email: req.body.email }
        }).then(function (email) {
            console.log("email: ", email);
            if (email.length != 0) {
                return res.render('user/register', { msg: 'Ya existe un usuario con ese email', oldData: req.body });
            }
        }).catch(function (err) {
            console.log(err);
        })

        // Aunque el correo sea válido se tienen que validar los campos de nuevo antes de crear el usuario
        if (resultValidation.errors.length > 0) {
            return res.render('user/register', {
                errors: resultValidation.mapped(),
                oldData: req.body,
            });
        }

        // Si se registra un nuevo correo, se crea el usuario
        db.User.create({
            name: req.body.nombre,
            last_name: req.body.apellido,
            email: req.body.email,
            password: bycrypt.hashSync(req.body.password, 10),
            image: imagen,
            created_at: Date.now(),
            role_id: 2
        })
            .then(user => {
                return res.render('user/login', { msgSuccess: 'Te has registrado con éxito' });
            })

    },

    // Editar - Vista (Update)
    edit: function (req, res) {
        let id = req.params.id;
        db.User.findByPk(id)
            .then(user => {
                console.log(user)
                res.render('user/edit-profile', { user: user });
            })
            .catch(function (err) {
                console.log(err);
            })
    },

    // actualizar
    update: function (req, res) {
        let id = req.params.id;
        let users = {};

        let correctPassword = false;
        let currentEmail = '';
        db.User.findByPk(id)
            .then(function (user) {
                currentEmail = user.email;
                correctPassword = bycrypt.compareSync(req.body.password, user.password);
                if (!correctPassword) {
                    res.render('user/edit-profile', { user: user, msg: "Tienes que escribir tu contraseña actual" });
                } 
            }) 

        // trabajando en el email 🤭 ...
        /* db.User.findAll()
        .then(function (users) {
            res.send(users)
            for (let i = 0; i < users.length; i++) {
                console.log("user "+ i + " ", users[i].name);
                
            }
            if (email.length != 0) {
                return res.render('user/edit-profile', { msg: 'Ya existe un usuario con ese email', user: email[0] });
            }
        }).catch(function (err) {
            console.log(err);
        }) */

        if (req.file == undefined) { // sino edita la imagen del perfil se mantiene la anterior
            users = {
                name: req.body.nombre,
                last_name: req.body.apellido,                
                //password: bycrypt.hashSync(req.body.password, 10),
                //image: imagen,                
                role_id: 2,
                updated_at: Date.now()
            };
        } else {  // si edita la imagen 
            users = {
                name: req.body.nombre,
                last_name: req.body.apellido,                
                //password: bycrypt.hashSync(req.body.password, 10),
                image: req.file.filename,                
                role_id: 2,
                updated_at: Date.now()
            }
        }

        db.User.update(
            users,
            {
                where: { id_user: id }
            }
        )
            .then(function (user) {
                res.redirect('/user/profile');
                // console.log("tengo id " + id);
                /* db.User.findByPk(id)
                    .then(function (response) {
                        console.log(response);
                        //res.redirect('/attribute/' + response.product_id);
                    })
                    .catch(function (err) {
                        console.log(err);
                    })  */
                //res.render('user/edit-profile', { user: user });
            }
            ) 

        //res.redirect('/user/edit/' + id);

    },

    profile: (req, res) => {
        return res.render('user/profile', {
            user: req.session.userLog
        });
    },

    logout: function (req, res) {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
    },

};

module.exports = userController;