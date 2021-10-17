/*const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const { validationResult } = require('express-validator');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const date = Date.now();*/
const db = require('../../database/models');
//const Attribute = require('../database/models/Attribute');


const adminProductController = {

    // listado de usuarios
    users: function (req, res) {
        db.User.findAll()
            .then(function (users) {                
                return res.status(200).json({
                    meta: {
                        status: 200,
                        url: "http://localhost:3000/api/users",
                        count: users.length,
                        users: users,
                        // colocar adentro de cada usuario */
                        //url_user: "http://localhost:3000/api/users/" + users.id_user
                        
                    }
                })
            })
    },

    // detalle de usuarios
    usersDetail: function (req, res) {
        let id = req.params.id;
        db.User.findByPk(id)
            .then(function (user) {                
                return res.status(200).json({
                    id: user.id_user,
                    name: user.name,
                    last_name: user.last_name,
                    email: user.email,
                    url_image: "http://localhost:3000/img/users/" + user.image,
                    url_user: "http://localhost:3000/api/users/" + req.params.id,
                    status: 200
                })
            })
    }
};

module.exports = adminProductController;