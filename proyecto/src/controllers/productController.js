const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const { validationResult } = require('express-validator');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const date = Date.now();
const db = require('../database/models/');

const productController = {

    // listado de todos los productos
    index: function (req, res) {
        db.Product.findAll()
            .then(function (products) {
                res.render('products/products', { productos: products, titelId: 1 });
            })
            .catch(function (err) {
                console.log(err);
            })
        /* let currentProducts = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        let titelId = 0; // Indica que el título será: Todos los productos
        res.render('products/products', { productos: currentProducts, titelId: titelId }); */
    },

    mujer: function (req, res) {
        // se leen los productos del archivo json
        let currentProducts = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        // Productos de mujer
        let titelId = 1; // Indica que el título será: Todos los productos de mujer
        let productsList = currentProducts.filter((producto) => {
            return producto.genero == "mujer";
        });
        res.render('products/products', { productos: productsList, titelId: titelId });
    },

    hombre: function (req, res) {
        let currentProducts = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        // Productos de hombre
        let titelId = 2; // Indica que el título será: Todos los productos de mujer
        let productsList = currentProducts.filter((producto) => {
            return producto.genero == "hombre";
        });
        res.render('products/products', { productos: productsList, titelId: titelId });
    },

    // página del administrador, donde se ven las opciones de crear y editar un producto
    admin: function (req, res) {
        res.render('admin/products-admin');
    },

    // página de creación de un producto
    add: function (req, res) {
        res.render('admin/add-product');
    },

    // método que contiene la lógica cuando se guarda un producto
    store: (req, res) => {
        let errors = validationResult(req);
        let product = {};
        if (errors.isEmpty()) { // si no hay errores, se guarda el producto
            if (req.file == undefined) { // si no se sube una imagen, se pone la imagen por defecto
                product = {
                    "id": date,
                    "nombre": req.body.nombre,
                    "descripcion": req.body.descripcion,
                    "imagen": 'default-image.png',
                    "categoria": req.body.categoria,
                    "genero": req.body.genero,
                    "disponible": req.body.disponible,
                    "color": req.body.color,
                    "talla": req.body.talla,
                    "modelo": req.body.modelo,
                    "precio": req.body.precio,
                    "descuento": req.body.descuento,
                    "enCarrito": false,
                    "cantidad": req.body.cantidad,
                };
            } else {
                product = {
                    "id": date,
                    "nombre": req.body.nombre,
                    "descripcion": req.body.descripcion,
                    "imagen": req.file.filename,
                    "categoria": req.body.categoria,
                    "genero": req.body.genero,
                    "disponible": req.body.disponible,
                    "color": req.body.color,
                    "talla": req.body.talla,
                    "modelo": req.body.modelo,
                    "precio": req.body.precio,
                    "descuento": req.body.descuento,
                    "enCarrito": false,
                    "cantidad": req.body.cantidad,
                };
            }
            products.push(product);

            productsJSON = JSON.stringify(products);
            fs.writeFileSync(productsFilePath, productsJSON);
            res.redirect('/products');
        } else { // si existe algún error, se renderiza de nuevo el formulario
            res.render('admin/add-product', { error: errors.mapped(), old: req.body });
        }
    },

    // página de detalle de un producto
    detalle: function (req, res) {
        let id = req.params.id;
        let producto;
        for (let i = 0; i < products.length; i++) {
            if (products[i].id == id) producto = products[i];
        }
        res.render('products/product-detail', { producto: producto, productos: products });
    },

    // metodo que devuelve el formulario de edición de un producto
    edit: function (req, res) {
        let id = req.params.id;
        let productoActual;
        for (producto of products) {
            if (producto.id == id) productoActual = producto;
        }

        res.render('admin/edit-product', { producto: productoActual });
    },

    // acción que actualiza el producto
    update: function (req, res) {
        let id = req.params.id;

        // Se obtiene el producto actual por si no se modifican algunos datos como la imágen
        let productoActual;
        for (producto of products) {
            if (producto.id == id) productoActual = producto;
        }

        // Si no se actualiza la imagen        
        if (req.file == undefined) {
            var product = {
                "id": productoActual.id,
                "nombre": req.body.nombre,
                "descripcion": req.body.descripcion,
                "imagen": productoActual.imagen,
                "categoria": req.body.categoria,
                "genero": req.body.genero,
                "disponible": req.body.disponible,
                "color": req.body.color,
                "talla": req.body.talla,
                "modelo": req.body.modelo,
                "precio": req.body.precio,
                "descuento": req.body.descuento,
                "enCarrito": false,
                "cantidad": req.body.cantidad
            };
        } else { // Si se actualiza la imagen            
            var product = {
                "id": productoActual.id,
                "nombre": req.body.nombre,
                "descripcion": req.body.descripcion,
                "imagen": req.file.filename,
                "categoria": req.body.categoria,
                "genero": req.body.genero,
                "disponible": req.body.disponible,
                "color": req.body.color,
                "talla": req.body.talla,
                "modelo": req.body.modelo,
                "precio": req.body.precio,
                "descuento": req.body.descuento,
                "enCarrito": false,
                "cantidad": req.body.cantidad
            };
        }

        for (let i = 0; i < products.length; i++) {
            if (products[i].id == id) {
                products[i] = product;
            }
        }

        productsJSON = JSON.stringify(products);
        fs.writeFileSync(productsFilePath, productsJSON);

        res.redirect('/products/product-detail/' + id);
    },

    // acción de borrado de un producto
    delete: (req, res) => {
        let id = req.params.id;
        newProducts = products.filter((product) => {
            return product.id != id ? product : undefined;
        });
        /* let newProducts = [];
        for (let i = 0; i < products.length; i++) {
            if (products[i].id != id) {
                newProducts.push(products[i]);
            }
        } */

        productsJSON = JSON.stringify(newProducts);
        fs.writeFileSync(productsFilePath, productsJSON);

        //alert("Se ha eliminado el producto");
        res.redirect('/products');
    }

};

module.exports = productController;