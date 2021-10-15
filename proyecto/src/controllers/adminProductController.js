const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const { validationResult } = require('express-validator');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const date = Date.now();
const db = require('../database/models');
const Attribute = require('../database/models/Attribute');


const adminProductController = {

    index: function (req, res) {
        res.render('admin/vista-admin')
    },

    // listado de todos los productos
    products: function (req, res) {
        db.Product.findAll({
            include : [ { model: db.Attribute,
                            as: "products_attributes" }]
        })
        .then( products => {
            let producto = [];
            products.forEach(element => {
                let este = element.dataValues.products_attributes;
                let tempPro = {};
                /* El usuario normal debería ver sólo los atributos que existen: 
                este.length > 0 */
                /* El administrador debe ver también los productos que no tiene atributos
                este.length >= 0 */
                if(este.length > 0){
                    tempPro = {
                        id_product: element.dataValues.id_product,
                        name: element.dataValues.name,
                        price: este[0].dataValues.price,
                        image: este[0].dataValues.image
                    }
                    //console.log(element.dataValues.products_attributes[0].dataValues)
                    //return res.send(producto);
                    producto.push(tempPro);
                } else {
                    /* esto sólo lo debería ver el administrador */
                    tempPro = {
                        id_product: element.dataValues.id_product,
                        name: element.dataValues.name,
                        price: 0,
                        image: 'default-image.png'
                    }
                    //console.log(element.dataValues.products_attributes[0].dataValues)
                    //return res.send(producto);
                    producto.push(tempPro);

                }
            });
            console.log(producto);
            //res.send(producto);
            res.render('adminProduct/admin-products', { productos: producto, titelId: 0 })
        }) 
        .catch(function (err) {
            console.log(err);
        })
    },

    // listado de usuarios
    users: function (req, res) {
        db.User.findAll()
            .then(function (users) {                
                res.render('admin/vista-users', { users: users })
            })
            .catch(function (err){
                console.log(err);
            })
    },

    // detalle de usuarios
    usersDetail: function (req, res) {
        let id = req.params.id;
        db.User.findByPk(id)
            .then(function (user) {                
                res.render('admin/vista-user-id', { user: user })
            })
            .catch(function (err){
                console.log(err);
            })
    },

    // Editar - Vista (Update)
    editUser: function (req, res) {
        let id = req.params.id;
        db.User.findByPk(id)
            .then(user => {                
                res.render('admin/edit-user', { user: user });
            })
            .catch(function (err) {
                console.log(err);
            })
    },

    // actualizar usuario desde admin
    updateUser: function (req, res) {
        let id = req.params.id;
        let users = {};
        
        let isAdmin = 2;
        if (req.body.admin == 'on') {
            isAdmin = 1;
        }

        if (req.file == undefined) { // sino edita la imagen del perfil se mantiene la anterior
            users = {
                name: req.body.nombre,
                last_name: req.body.apellido,                
                //password: bycrypt.hashSync(req.body.password, 10),
                //image: imagen,     
                role_id: isAdmin,                           
                updated_at: Date.now()
            };
        } else {  // si edita la imagen 
            users = {
                name: req.body.nombre,
                last_name: req.body.apellido,                
                //password: bycrypt.hashSync(req.body.password, 10),
                image: req.file.filename, 
                role_id: isAdmin,                               
                updated_at: Date.now()
            }
        }

        // se actualiza el usuario
        db.User.update(
            users
            , {
                where: { id_user: id }
            }
        )
            .then(function (user) {
                // se obtiene el usuario actualizado
                //res.redirect('/admin/users');
                db.User.findByPk(id)
                    .then(function (user) { 
                        //req.session.userLog = user;
                        res.redirect('/admin/users');
                    }).catch(function (err){
                        console.log(err);
                    })
            }
                ).catch(function (err) {
                    console.log(err);
                }) 

    },

    // eliminar usuario de la base de datos
    deleteUser: function (req, res) {
        let id = req.params.id;
        db.User.destroy({
            where: {
                id_user : id
            }
        })
            .then( function (){
                res.redirect('/admin/users');
            })
            .catch( function (err){
                console.log(err);
            })
    },

    // página de creación de un producto
    add: function (req, res) {

        res.render('admin/add-product');
    },

    // método que contiene la lógica cuando se guarda un producto
    store: (req, res) => {
        let errors = validationResult(req);
        console.log(req.body);
        //console.log(req.file);
        if (errors.isEmpty()) { // si no hay errores, se guarda el producto
            /*
            let img = "default-image.png";
            if (req.file != undefined) {
                img = req.body.imagen;
            }
            */

            db.Product.create({
                name: req.body.nombre,
                description: req.body.descripcion,
                model: req.body.modelo,
                created_at: Date.now(),
                /*
                products_attributes: [{
                    available: req.body.disponible,
                    image: img,
                    price: req.body.precio,
                    discount: req.body.descuento,
                    quantity: req.body.cantidad,
                    gender: req.body.genero,
                    size_id: req.body.talla,
                    color_id: req.body.color,
                    category_id: req.body.categoria
                },
            ] }*/
            /*
            ,
             {
                include: [{ model: db.Attribute, as: 'products_attributes' }]*/
            })
                .then(function (resp) {
                    console.log("no hubo errores")
                    res.redirect('/admin/');
                })
                .catch(function (err) {
                    console.log(err);
                })

        } else { // si existe algún error, se renderiza de nuevo el formulario
            console.log(req.body);
            console.log("si hubo errores");
            //console.log(req.file);
            /*
            let promCategory = db.Category.findAll()
            let promColor = db.Color.findAll()
            let promSize = db.Size.findAll()

            */
/*
            Promise.all([promCategory, promColor, promSize])
                .then(function ([resCategory, resColor, resSize]) {
                    //console.log(resCategory, resColor, resSize);
                    res.render('admin/add-product', { categories: resCategory, colors: resColor, sizes: resSize, error: errors.mapped(), old: req.body });
                })
                .catch(function (err) {
                    console.log(err);
                })

                */
            res.render('admin/add-product', { error: errors.mapped(), old: req.body });
        }
    },

    // metodo que devuelve el formulario de edición de un producto
    edit: function (req, res) {
        let id = req.params.id;
        db.Product.findByPk(id)
        .then( pro => {
            console.log(pro);
            //res.render('admin/edit-product', { producto: productoActual });
            res.render('admin/edit-product', { producto: pro });
        })
        .catch(function (err) {
            console.log(err);
        })
    },

    // acción que actualiza el producto
    update: function (req, res) {
        let id = req.params.id;
        let prod = {
            "name": req.body.nombre,
            "description": req.body.descripcion,
            "model": req.body.modelo
        };
        console.log('prod');
        db.Product.update(prod,{ where: { id_product: id } })
        .then( pro => {
            console.log(pro);
            //res.render('admin/edit-product', { producto: productoActual });
            //res.render('admin/edit-product', { producto: pro });
            res.redirect('/admin/');
        })
        .catch(function (err) {
            console.log(err);
        })

        // Se obtiene el producto actual por si no se modifican algunos datos como la imágen
        /*
        let productoActual;
        for (producto of products) {
            if (producto.id == id) productoActual = producto;
        }
*/
        // Si no se actualiza la imagen 
        /*       
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
*/
/*
        for (let i = 0; i < products.length; i++) {
            if (products[i].id == id) {
                products[i] = product;
            }
        }

        productsJSON = JSON.stringify(products);
        fs.writeFileSync(productsFilePath, productsJSON);
*/
        //res.redirect('/products/product-detail/' + id);
    },

    // acción de borrado de un producto
    delete: (req, res) => {
        let id = req.params.id;
        
       Promise.all([db.Attribute.destroy({where: { product_id: id}}), db.Product.destroy({ where: { id_product: id } })])

        //db.Product.destroy({ where: { id_product: id } })
        .then( p => {
            console.log(p);
            res.redirect('/admin/');
        })
        .catch(function (err) {
            console.log(err);
        })
        
    }

};

module.exports = adminProductController;