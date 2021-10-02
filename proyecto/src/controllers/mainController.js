const fs = require('fs');
const path = require('path');
//const { Op } = require('sequelize/types');
const { Sequelize } = require('../database/models');
const Op = Sequelize.Op;

const productsFilePath = path.join(__dirname, '../data/products.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const db = require('../database/models');

const mainController = {

    index: function (req, res) {
        db.Product.findAll({
            include : [ { model: db.Attribute,
                            as: "products_attributes" }],
                            order: [
                                ['id_product', 'DESC']
                            ]
        })
        .then( products => {
            //let query = products[0].products_attributes[0].category_id;            
            //return res.send(products[0]);
            let productosOferta = [];            
            let productosTendencia = [];
            products.forEach(product => {
                //console.log("catId", product.products_attributes[0].category_id);
                if (product.products_attributes[0].category_id) {
                    if (product.products_attributes[0].category_id == 1) {
                        productosOferta.push(product);
                    } else {
                        productosTendencia.push(product);
                    }
                }
            });
            res.render("main/index", { productosOferta, productosTendencia });            
        }) 
        .catch(function (err) {
            console.log(err);
        })
        /* // se leen los productos del archivo json
        products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        // Productos visitados
        let productosTendencia = products.filter((producto) => {
            return producto.categoria == "Tendencias";
        });

        // productos en oferta
        let productosOferta = products.filter((producto) => {
            return producto.categoria == "Ofertas";
        })

        // se renderiza la vista con esos elementos */
        //res.render('main/index');
    },

    privacidad: function (req, res) {
        res.render('main/privacidad');
    },

    legal: function (req, res) {
        res.render('main/legal');
    },

    terminos: function (req, res) {
        res.render('main/terminos');
    },

    faq: function (req, res) {
        res.render('main/faq');
    },

    about: function (req, res) {
        res.render('main/about');
    },

    contact: function (req, res) {
        res.render('main/contacto');
    },

    search: function(req, res) {
        let query = req.body.search;
        //res.send(query);
        db.Product.findAll({
            include : [ { model: db.Attribute,
                        as: "products_attributes" }],  
            where: {
                [Op.or]: [{name: { [Op.like]: `%${query}%` }}, {description: { [Op.like]: `%${query}%` }}]
            }                      
            /* where: {
                name: { [Op.like]: `%${query}%` }                
            } */
        })
            .then(function (productos) {
                //res.send(productos);
                res.render('main/search', { query: query, productos: productos});
            })
            .catch(function (err){
                console.log(err);
            })
    }

};

module.exports = mainController;