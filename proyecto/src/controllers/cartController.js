const cartController = {
    // Listado de los productos en el carrito
    index: function (req, res) {
        res.render('cart/carritoNV');
        //res.render('/carritoVacio');
        },
    // Saca Item del carrito
    sacarItem: function (req, res) {
        //res.render('/sacarItem');
        res.send('Estoy en sacarItem')
        },
    // Consulta item del carrito
    consultarItem: function (req, res) {
        //res.render('/consultarItem');
        res.send('Estoy en consultarItem')
        },
    // Agrega item al carrito
    agregarItem: function (req, res) {
        //res.render('/agregarItem');
        res.send('Estoy en agregarItem')
        },
}

module.exports = cartController;

