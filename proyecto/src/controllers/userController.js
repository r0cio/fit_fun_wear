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
                        //console.log(user[0]);
                        //return res.send(user[0]);
                        let user2 = user[0];
                        //req.session.userLogged = user2;
                        req.session.userLog = user2;
                        //console.log("sess", req.session);
                        //return res.send(user2);
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

        let imagen = 'default-image.png';
        if (req.file) {
            imagen = req.file.filename;
        }

        db.User.create({
            name: req.body.nombre,
            last_name: req.body.apellido,
            email: req.body.email,
            password: bycrypt.hashSync(req.body.password, 10),
            image: imagen,
            created_at: Date.now(),
            role_id: 2
        });

        /* Aquí va la validación de si ya está un email registrado
                db.User.findOne({
                    where: {email: req.body.email}
            }) .then(function(email){
                console.log(email);
                //return res.render('user/register', { msg: 'Este usuario ya está registrado' });
            }).catch(function (err) {
                console.log(err);
            })*/

        return res.render('user/login', { msgSuccess: 'Te has registrado con éxito' });
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
        db.User.update(user, { where: { id_user: id } })
            .then(user => {
                console.log(user);
            })
            .catch(function (err) {
                console.log(err);
            })
        /*
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

        let userCreated = User.create(userToCreate);*/
        res.redirect('/user/edit/' + id);

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