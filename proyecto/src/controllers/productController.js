const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const date = Date.now();

const productController = {

    // listado de todos los productos
    index: function (req, res) {
        let currentProducts = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        res.render('products/products', { productos: currentProducts });
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
		let product = {
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
        products.push(product);

		productsJSON = JSON.stringify(products);
		fs.writeFileSync(productsFilePath, productsJSON);
        res.redirect('/products');
    },

    // página de detalle de un producto
    detalle: function (req, res) {
        let id = req.params.id;
        let producto;
        for (let i = 0; i < products.length; i++) {
            if (products[i].id == id) producto = products[i];
        }
        res.render('products/product-detail', { producto: producto });
    },

    // metodo que devuelve el formulario de edición de un producto
    edit: function (req, res) {
        // Falta probar esto
        let id = req.params.id;
        let productoActual;
        for (producto of products) {
            if (producto.id == id) productoActual = producto;
        }

        res.render('admin/edit-product', { producto: productoActual });
    },

    // acción que actualiza el producto
    update: function (req, res) {
        // Falta probar esto
        let id = req.params.id;
        let product = {
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
    },

    // acción de borrado de un producto
    delete: (req, res) => {
        // Falta probar esto
        let id = req.params.id;
        console.log(id);
        /*newProducts = products.filter((product) => {
            return product.id != id ? product : undefined;
        });*/
        let newProducts = [];
        for (let i = 0; i < products.length; i++) {
            if (products[i].id != id) {
                newProducts.push(products[i]);
            }
        }

        productsJSON = JSON.stringify(newProducts);
        fs.writeFileSync(productsFilePath, productsJSON);

        //alert("Se ha eliminado el producto");
        res.redirect('/products');
    }

};

module.exports = productController;