const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const date = Date.now();

const productController = {

    detalle: function (req, res) {
        let id = req.params.id;
        let producto;
        for (let i = 0; i < products.length; i++) {
            if (products[i].id == id) producto = products[i];
        }
        res.render('products/product-detail', { producto: producto });
    }

};

module.exports = productController;