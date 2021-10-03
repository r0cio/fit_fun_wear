const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const { validationResult } = require('express-validator');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const date = Date.now();
const db = require('../database/models');
const { resolveSoa } = require('dns');


const attributeController = {

    // listado de todos los atributos de un producto
    index: function (req, res) {
        let id = req.params.id;
        //console.log('id ' + id);

        Promise.all([   db.Product.findByPk(id), 
                        db.Attribute.findAll({ where: { product_id: id } }),
                        db.Color.findAll(), 
                        db.Size.findAll()])

        //db.Product.destroy({ where: { id_product: id } })
        .then(function ([resPro, resAttr, resColor, resSize]) {
            //console.log(resPro)
            res.render('adminProduct/admin-attribute', {productos: resAttr, 
                                                        name: resPro.name,
                                                        id: resPro.id_product,
                                                        colors: resColor, 
                                                        sizes: resSize })
        })
        .catch(function (err) {
            console.log(err);
        })
    },

    // página de creación de un atributo
    add: function (req, res) {
        //console.log("estoy en add");
        let id = req.params.id;

        Promise.all([   db.Product.findByPk(id), 
            db.Attribute.findAll({ where: { product_id: id } }),
            db.Color.findAll(), 
            db.Size.findAll(),
            db.Category.findAll()])

            .then(function ([resPro, resAttr, resColor, resSize, resCatego]) {
                res.render('admin/add-attribute', {productos: resAttr, 
                                                            name: resPro.name,
                                                            id: resPro.id_product,
                                                            colors: resColor, 
                                                            sizes: resSize,
                                                            categories:resCatego })
            })
            .catch(function (err) {
                console.log(err);
            })
    },

    // método que contiene la lógica cuando se guarda un atributo
    store: (req, res) => {
        let errors = validationResult(req);
        //console.log("estoy en store");
        console.log(req.body);
        /* console.log("filename", req.file.filename);
        console.log("path", req.file.path); */

        let id = req.params.id;
        let img = "default-image.png";
        if (req.file != undefined) {
            img = req.file.filename;
        };

        if (errors.isEmpty()) { // si no hay errores, se prueba que colores y size sean únicos
            Promise.all([
                db.Attribute.findOne({ where: { product_id: id,
                                                color_id: req.body.color,
                                                size_id: req.body.talla } }),
                db.Color.findAll(), 
                db.Size.findAll()])
            .then(function ([ resAttr, resColor, resSize]) {

                if(resAttr != null){
                    // aquí habría que llamar a alguna sección de la vista para que presente ese error. Por ahora lo dejo así.
                    res.send('La combinación de color y talla ya existe ' + resAttr.color_id + ' ' + resAttr.size_id );
                    throw new Error('La combinación de color y talla ya existe');

                } else {
                    //res.send('no hay error');
// por el momento no tengo imagen
                    //console.log(img);

                    // aquí finalmente se crea el atributo nuevo asociado a ese producto

                    const resPro = db.Product.findOne({
                        where: {
                            id_product: id
                        }
                    });

                    Promise
                    .all([resPro])
                    .then( response => {
                        console.log(response[0].id_product);
                        return db.Attribute
                            .create ({
                                available: req.body.disponible,
                                image: img,
                                price: req.body.precio,
                                discount: req.body.descuento,
                                quantity: req.body.cantidad,
                                gender: req.body.genero,
                                size_id: req.body.talla,
                                color_id: req.body.color,
                                category_id: req.body.categoria,
                                product_id: response[0].id_product,
                            })
                            .then(atributo => res.status(200).redirect('/attribute/'+ atributo.product_id))
                            .catch(error => res.status(400).send(error));
                    })
                }         
            })
            .catch(function (err) {
                console.log(err);
                })    
        } else { // si existe algún error, se renderiza de nuevo el formulario
            console.log(req.body);
            console.log("si hubo errores");

            Promise.all([   db.Product.findByPk(id), 
                db.Attribute.findAll({ where: { product_id: id } }),
                db.Color.findAll(), 
                db.Size.findAll(),
                db.Category.findAll()])
    
                .then(function ([resPro, resAttr, resColor, resSize, resCatego]) {
                    res.render('admin/add-attribute', { error: errors.mapped(), old: req.body,
                                                        productos: resAttr, 
                                                        name: resPro.name,
                                                        id: resPro.id_product,
                                                        colors: resColor, 
                                                        sizes: resSize,
                                                        categories:resCatego })
                })
                .catch(function (err) {
                    console.log(err);
                })

            //res.render('admin/add-attribute', { error: errors.mapped(), old: req.body, id: id });
        }
    },

    // página de detalle de un atributo
    detalle: function (req, res) {
        const colores = [];
        const tamanos = [];
        const categorias = [];
        let id = req.params.id;
/****************** Colors */
        db.Product.findAll({
            include : [ {   model: db.Color,
                            as: "products_colors",
                              }],
            where: {id_product: id}
        })
        .then(colors => {
            colors.forEach(element => {
                
                let este = element.dataValues.products_colors;
                este.forEach( colorTemp => {
                    //console.log(colorTemp.dataValues)
                    let tempColor = {
                        id_color : colorTemp.dataValues.id_color,
                        name : colorTemp.dataValues.name
                    };
                    colores.push(tempColor);
                })
                //console.log(este);
            });
            //console.log(colores);
        })
        .catch(function (err) {
            console.log(err);
        })
        console.log("colores ")
/****************** Sizes */

            db.Product.findAll({
                include : [ 
                    {   model: db.Size,
                        as: "products_sizes"
                    }],
                where: {id_product: id}
            })
            .then(tam => {
                //console.log(tam.length);

                tam.forEach(element => {
                    
                    let este = element.dataValues.products_sizes;
                    este.forEach( temp => {
                        //console.log(temp.dataValues)
                        let tempSize = {
                            id_size : temp.dataValues.id_size,
                            name : temp.dataValues.name
                        };
                        tamanos.push(tempSize);
                    })
                    //console.log(este);
                });
                //console.log(tamanos);

            })
            .catch(function (err) {
                console.log(err);
            })


        console.log("tamaños ")

        db.Attribute.findAll({
            group: ['id_attribute','available','image','price','discount','quantity','gender','size_id','color_id','category_id','product_id',
                    'product_id'],
            include : [ {   model: db.Product,
                            as: "products",
                            where: { id_product: id } }, 
                      ],

        })
        .then( attributes => {
            //console.log(attributes);
            
            let productos = [];
            attributes.forEach(element => {
                //console.log(element);

                let este = element.dataValues;
                //console.log(este);

                let tempPro = {};

                tempPro = {
                    id: este.product_id,
                    id_attribute: este.id_attribute,
                    nombre: este.products.dataValues.name,
                    precio: este.price,
                    descuento: este.discount,
                    descripcion: este.products.dataValues.description,
                    cantidad: este.quantity,
                    color: este.color_id,
                    talla: este.size_id,
                    imagen: este.image
                };

                productos.push(tempPro);

            });

            //console.log(productos);
            //console.log(colores);
            //console.log(tamanos);
            
            //res.send(productos);
            res.render('products/product-detail', { productos: productos, colores: colores, tamanos: tamanos })

        }) 

        .catch(function (err) {
            console.log(err);
        })

        /*
        let producto;
        for (let i = 0; i < products.length; i++) {
            if (products[i].id == id) producto = products[i];
        }
        res.render('products/product-detail', { producto: producto, productos: products });
        */

    },

    // metodo que devuelve el formulario de edición de un atributo
    edit: function (req, res) {
        let id = req.params.id;
        //console.log('id attribute ' + id);

        let atrCategory = db.Category.findAll();
        let atributo = db.Attribute.findByPk(id);

        Promise.all([atrCategory, atributo])
        .then(function ([resCategory, resAtributo]) {
            //console.log(resCategory, resColor, resSize);
            let atrObject = {
                id: resAtributo.id_attribute,
                imagen: resAtributo.image,
                genero: resAtributo.gender,
                disponible: resAtributo.available,
                precio: resAtributo.price,
                descuento: resAtributo.discount,
                category_id: resAtributo.category_id,
                cantidad: resAtributo.quantity
            }
            //console.log(atrObject, resCategory);
            res.render('admin/edit-attribute', { categories: resCategory, producto: atrObject });
        })
        .catch(function (err) {
            console.log(err);
        })

    },

    // acción que actualiza el atributo
    update: function (req, res) {
        let id = req.params.id;
        //console.log("Estoy en update");
        //console.log('id_attribute ' + id);
        //console.log(req.body);

        let valores = {};

        if( req.file == undefined){
            valores = {
                gender : req.body.genero,
                available : req.body.disponible,
                price : req.body.precio,
                discount : req.body.descuento,
                category_id : req.body.categoria,
                quantity : req.body.cantidad,
            };
        } else {
            valores = {
                image : req.file.filename,
                gender : req.body.genero,
                available : req.body.disponible,
                price : req.body.precio,
                discount : req.body.descuento,
                category_id : req.body.categoria,
                quantity : req.body.cantidad,
            }
        }

        db.Attribute.update(
            valores,
            {
                where : { id_attribute : id }
            }
        )
        .then( function() {
            console.log("tengo id " + id);
            db.Attribute.findByPk(id)
            .then(function(response){
                //console.log(response);
                res.redirect('/attribute/' + response.product_id);
            })
            .catch(function (err) {
                console.log(err);
            })
        }   

        )
        .catch(function (err) {
            console.log(err);
        })

    },

    // acción de borrado de un atributo
    delete: (req, res) => {
        let id = req.params.id;
        console.log(id);
        let idP = -1;
        
        db.Attribute.findByPk(id)
        .then( p => {
            console.log(p);
            idP = p.product_id ;
        })
        .catch(function (err) {
            console.log(err);
        })
        // falta poner un warning de si sí quiere borrar el elemento
        // cómo se borra el archivo de la imagen? o ese nunca se borra?
        db.Attribute.destroy({where: { id_attribute: id}}) 
         .then( p => {
             console.log(p);
             res.redirect('/attribute/'+ idP);
         })
         .catch(function (err) {
             console.log(err);
         })

    }

};

module.exports = attributeController;