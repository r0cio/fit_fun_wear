const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const { validationResult } = require('express-validator');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const date = Date.now();
const db = require('../database/models');
const Attribute = require('../database/models/Attribute');

const productController = {

    // listado de todos los productos
    index: function (req, res) {
        db.Product.findAll({
            include: [{ association: "products_categories" }, { association: "products_colors" }, { association: "products_sizes" }, { association: "products_attributes" }]
        })
            .then(function (products) {
                res.render('products/products', { productos: products, titelId: 0 });
            })
            .catch(function (err) {
                console.log(err);
            })
        /* let currentProducts = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        let titelId = 0; // Indica que el título será: Todos los productos
        res.render('products/products', { productos: currentProducts, titelId: titelId }); */
    },

    mujer: function (req, res) {
        db.Product.findAll({
            include: [{ association: "products_categories" }, { association: "products_colors" }, { association: "products_sizes" }, { association: "products_attributes", where: { gender: 'M' } }]
        })
            .then(function (products) {
                //console.log(products);
                res.render('products/products', { productos: products, titelId: 1 });
            })
            .catch(function (err) {
                console.log(err);
            })
        //const [results, metadata] = await db.sequelize.query("SELECT `Product`.`id_product`, `Product`.`name`, `Product`.`description`, `Product`.`model`, `Product`.`created_at`, `Product`.`updated_at`, `products_categories`.`id_category` AS `products_categories.id_category`, `products_categories`.`name` AS `products_categories.name`, `products_categories->attributes`.`product_id` AS `products_categories.attributes.product_id`, `products_categories->attributes`.`size_id` AS `products_categories.attributes.size_id`, `products_colors`.`id_color` AS `products_colors.id_color`, `products_colors`.`name` AS `products_colors.name`, `products_colors->attributes`.`product_id` AS `products_colors.attributes.product_id`, `products_colors->attributes`.`size_id` AS `products_colors.attributes.size_id`, `products_sizes`.`id_size` AS `products_sizes.id_size`, `products_sizes`.`name` AS `products_sizes.name`, `products_sizes->attributes`.`product_id` AS `products_sizes.attributes.product_id`, `products_sizes->attributes`.`size_id` AS `products_sizes.attributes.size_id`, `products_attributes`.`id_attribute` AS `products_attributes.id_attribute`, `products_attributes`.`available` AS `products_attributes.available`, `products_attributes`.`image` AS `products_attributes.image`, `products_attributes`.`price` AS `products_attributes.price`, `products_attributes`.`discount` AS `products_attributes.discount`, `products_attributes`.`quantity` AS `products_attributes.quantity`, `products_attributes`.`gender` AS `products_attributes.gender`, `products_attributes`.`size_id` AS `products_attributes.size_id`, `products_attributes`.`color_id` AS `products_attributes.color_id`, `products_attributes`.`category_id` AS `products_attributes.category_id`, `products_attributes`.`product_id` AS `products_attributes.product_id` FROM `products` AS `Product` LEFT OUTER JOIN ( `attributes` AS `products_categories->attributes` INNER JOIN `categories` AS `products_categories` ON `products_categories`.`id_category` = `products_categories->attributes`.`category_id`) ON `Product`.`id_product` = `products_categories->attributes`.`product_id` LEFT OUTER JOIN ( `attributes` AS `products_colors->attributes` INNER JOIN `colors` AS `products_colors` ON `products_colors`.`id_color` = `products_colors->attributes`.`color_id`) ON `Product`.`id_product` = `products_colors->attributes`.`product_id` LEFT OUTER JOIN ( `attributes` AS `products_sizes->attributes` INNER JOIN `sizes` AS `products_sizes` ON `products_sizes`.`id_size` = `products_sizes->attributes`.`size_id`) ON `Product`.`id_product` = `products_sizes->attributes`.`product_id` LEFT OUTER JOIN `attributes` AS `products_attributes` ON `Product`.`id_product` = `products_attributes`.`product_id` where products_attributes.gender = 'M';");
        //console.log(results);
        //res.render('products/products', { productos: results, titelId: 1 });
        /* // se leen los productos del archivo json
        let currentProducts = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        // Productos de mujer
        let titelId = 1; // Indica que el título será: Todos los productos de mujer
        let productsList = currentProducts.filter((producto) => {
            return producto.genero == "mujer";
        });
        res.render('products/products', { productos: productsList, titelId: titelId }); */
    },

    hombre: function (req, res) {
        db.Product.findAll({
            include: [{ association: "products_categories" }, { association: "products_colors" }, { association: "products_sizes" }, { association: "products_attributes", where: { gender: 'h' } }]
        })
            .then(function (products) {
                //console.log(products);
                res.render('products/products', { productos: products, titelId: 2 });
            })
            .catch(function (err) {
                console.log(err);
            })
        /* let currentProducts = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        // Productos de hombre
        let titelId = 2; // Indica que el título será: Todos los productos de mujer
        let productsList = currentProducts.filter((producto) => {
            return producto.genero == "hombre";
        });
        res.render('products/products', { productos: productsList, titelId: titelId }); */
    },

    // página del administrador, donde se ven las opciones de crear y editar un producto
    admin: function (req, res) {
        res.render('admin/products-admin');
    },

    // página de creación de un producto
    add: function (req, res) {
        let promCategory = db.Category.findAll()
        let promColor = db.Color.findAll()
        let promSize = db.Size.findAll()

        Promise.all([promCategory, promColor, promSize])
            .then(function ([resCategory, resColor, resSize]) {
                //console.log(resCategory, resColor, resSize);
                res.render('admin/add-product', { categories: resCategory, colors: resColor, sizes: resSize });
            })
            .catch(function (err) {
                console.log(err);
            })
        //res.render('admin/add-product');
    },

    // método que contiene la lógica cuando se guarda un producto
    store: (req, res) => {
        let errors = validationResult(req);
        console.log(req.body);
        console.log(req.file);
        if (errors.isEmpty()) { // si no hay errores, se guarda el producto
            let img = "default-image.png";
            if (req.file != undefined) {
                img = req.body.imagen;
            }

            db.Product.create({
                name: req.body.nombre,
                description: req.body.descripcion,
                model: req.body.modelo,
                created_at: Date.now(),
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
                },]
            }, {
                include: [/* db.Attribute, as: 'products' */{ model: db.Attribute, as: 'products_attributes' }]
            })
                .then(function (resp) {
                    res.redirect('/products');
                })
                .catch(function (err) {
                    console.log(err);
                })
            /* product = {
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
            }; */
            /* else {
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
           res.redirect('/products'); */
        } else { // si existe algún error, se renderiza de nuevo el formulario
            console.log(req.body);
            console.log(req.file);
            let promCategory = db.Category.findAll()
            let promColor = db.Color.findAll()
            let promSize = db.Size.findAll()

            Promise.all([promCategory, promColor, promSize])
                .then(function ([resCategory, resColor, resSize]) {
                    //console.log(resCategory, resColor, resSize);
                    res.render('admin/add-product', { categories: resCategory, colors: resColor, sizes: resSize, error: errors.mapped(), old: req.body });
                })
                .catch(function (err) {
                    console.log(err);
                })
            //res.render('admin/add-product', { error: errors.mapped(), old: req.body });
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