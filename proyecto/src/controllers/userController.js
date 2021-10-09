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
/*
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
        .then( user => {
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
};

module.exports = userController;