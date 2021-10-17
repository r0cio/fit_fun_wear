const fs = require('fs');
//const path = require('path');
//const productsFilePath = path.join(__dirname, '../data/products.json');
//const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
//const { validationResult } = require('express-validator');

//const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//const date = Date.now();
const db = require('../../database/models');
const { resolveSoa } = require('dns');


const attributeController = {

    // listado de todos los atributos de un producto
    index: function (req, res) {
        let id = req.params.id;
        //console.log('id ' + id);

        Promise.all([   db.Attribute.findAll({ where: { product_id: id } }),
                        db.Color.findAll(), 
                        db.Size.findAll()])
        .then(function ([resAttr, resColor, resSize]) {
            //console.log(resPro)
            let atributos = [];
            if(resAttr.length > 0){
                resAttr.forEach(element => {
                    let este = {
                        id_attribute : element.dataValues.id_attribute,
                        available: element.dataValues.available,
                        image: element.dataValues.image,
                        price: element.dataValues.price,
                        discount: element.dataValues.discount,
                        quantity: element.dataValues.quantity,
                        gender: element.dataValues.gender,
                        size_id: element.dataValues.size_id,
                        color_id: element.dataValues.color_id,
                        category_id: element.dataValues.category_id,
                        product_id: element.dataValues.product_id,
                        detail: 'http://localhost:3000/api/attributes/detail/' + element.dataValues.id_attribute
                    };
                    atributos.push(este);
                });
            }

            return res.status(200).json ({

                meta: {
                    count: resAttr.length,
                    color: resColor.length,
                    size: resSize.length,
                    id_product: id,
                },
                attributes: atributos,
            })
            //res.render('adminProduct/admin-attribute', {productos: resAttr, 
                                                       // name: resPro.name,
                                                       // id: resPro.id_product,
                                                       // colors: resColor, 
                                                       // sizes: resSize })
            
            
        })
        .catch(function (err) {
            console.log(err);
        })
    },

    // página de detalle de un atributo
    detalle: function (req, res) {
        let id = req.params.id;
        
        Promise.all([ 
                db.Attribute.findByPk(id)
            ])
            .then( function ([ attribute ]) {
                let attr =  {
                    id_attribute: attribute.dataValues.id_attribute,
                    available:  attribute.dataValues.available,
                    image: 'http://localhost:3000/img/products/' + attribute.dataValues.image,
                    price: attribute.dataValues.price,
                    discount: attribute.dataValues.discount,
                    quantity: attribute.dataValues.quantity,
                    gender: attribute.dataValues.gender,
                    size_id: attribute.dataValues.size_id,
                    color_id: attribute.dataValues.color_id,
                    category_id: attribute.dataValues.category_id,
                    product_id: attribute.dataValues.product_id,
                }

                /****************** Attributes */
                return res.status(200).json ({
                    attribute: attr
                })

            }) 
            .catch(function (err) {
                    console.log(err);
            })

/****************** Colors */
/*
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

*/
/****************** Sizes */
/*
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

*/

/*
        db.Attribute.findAll({
            group: ['id_attribute','available','image','price','discount','quantity','gender','size_id','color_id','category_id','product_id', 'product_id'],
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
            //res.render('products/product-detail', { productos: productos, colores: colores, tamanos: tamanos })

        }) 

        .catch(function (err) {
            console.log(err);
        })
        */

    },


};

module.exports = attributeController;