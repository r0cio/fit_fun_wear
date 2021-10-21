const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const cartController = {
    // Listado de los productos en el carrito
    index: function (req, res) {
        //let currentProducts = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		// Productos en el carrito
		let productsList = products.filter( (producto) => {
			return producto.enCarrito == true;
		});
        res.render('cart/index', { article: productsList });

    },
    // Saca Item del carrito
    sacarItem: function (req, res) {
        //let currentProducts = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        let id = req.params.id;

        for (let i = 0; i < products.length; i++) {
            if (products[i].id == id) {
                products[i].enCarrito = false;
            }
        }

        let productsList = products.filter( (producto) => {
			return producto.enCarrito == true;
		});
        res.render('cart/index', { article: productsList });

        /*
        articulo = article.filter(articulo => articulo.id == req.params.id)[0];
        console.log("el articulo a quitar es " + (articulo.id).toString());
        article.splice((articulo.id) - 1, 1);
        res.render('cart/index', { 'article': article });
        */
    },
    // Consulta item del carrito
    consultarItem: function (req, res) {
        //res.render('/consultarItem');
        res.send('Estoy en consultarItem')
    },
    // Agrega item al carrito
    agregarItem: function (req, res) {
        let id = req.params.id;
        console.log(id);
        
        for (let i = 0; i < products.length; i++) {
            if (products[i].id == id) {
                products[i].enCarrito = true;
            }
        }
        let productsList = products.filter( (producto) => {
			return producto.enCarrito == true;
		});

        //productsJSON = JSON.stringify(products);
        //fs.writeFileSync(productsFilePath, productsJSON);

        res.render('cart/index', { article: productsList });

    },
}

module.exports = cartController;

