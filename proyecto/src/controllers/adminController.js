// Configuraciones
const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const date = Date.now();

const adminController = {

    admin: function (req, res) {
        res.render('admin/products-admin');
    },

    add: function (req, res) {
        res.render('admin/add-product');
    },

    store: function (req, res) {
        console.log(req.body);
        //let colores = [req.body.color];
        let producto = {
            "id": date,
            "nombre": req.body.nombre,
            "descripcion": req.body.descripcion,
            "imagen": "/img/jade-tennis.jpg",
            "categoria": req.body.categoria,
            "genero": req.body.genero,
            "disponible": req.body.disponible,
            "color": [
                "Verde",
                "Azul"
            ],
            "talla": [
                27,
                30,
                35
            ],
            "modelo": req.body.modelo,
            "precio": req.body.precio,
            "descuento": req.body.descuento,
            "enCarrito": false,
            "cantidad": req.body.cantidad
        };

        products.push(producto);
        productsJSON = JSON.stringify(products);
        fs.writeFileSync(productsFilePath, productsJSON);

        res.redirect('/products');

    },

    edit: function (req, res) {
        let id = req.params.id;
        let producto;
        for (producto of products) {
            if (producto.id == id) producto = producto;
        }

        res.render('admin/edit-product', { producto: producto });
    },

    update: function (req, res) {
        let id = req.params.id;
        // Se obtiene el producto actual por si no se modifican algunos datos como la imágen
        let product = {
            "id": date,
            "nombre": req.body.nombre,
            "descripcion": req.body.descripcion,
            "imagen": "/img/jade-tennis.jpg",
            "categoria": req.body.categoria,
            "genero": req.body.genero,
            "disponible": req.body.disponible,
            "color": [
                "Verde",
                "Azul"
            ],
            "talla": [
                27,
                30,
                35
            ],
            "modelo": req.body.modelo,
            "precio": req.body.precio,
            "descuento": req.body.descuento,
            "enCarrito": false,
            "cantidad": req.body.cantidad
        };

        for (let i = 0; i < products.length; i++) {
            if (products[i].id == id) {
                products[i] = product;
            }
        }

        productsJSON = JSON.stringify(products);
        fs.writeFileSync(productsFilePath, productsJSON);

        res.redirect('/products/detail/' + id);
    }


};

module.exports = adminController;