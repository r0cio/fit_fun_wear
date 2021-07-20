const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const mainController = {

    index: function (req, res) {
        // se leen los productos del archivo json
        products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        // Productos visitados
        let productosTendencia = products.filter((producto) => {
            return producto.categoria == "tendencias";
        });

        // productos en oferta
        let productosOferta = products.filter((producto) => {
            return producto.categoria == "ofertas";
        })

        // se renderiza la vista con esos elementos
        res.render("main/index", { productosOferta, productosTendencia, toThousand });
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
    }

};

module.exports = mainController;