let article = [
    {
     id: "1",
     imagen: "/img/jade-tennis.jpg",
     disponible : true,
     desc: "Tenis para hombre marca NIKE",
     color:"Verde",
     talla:"27",
     modelo:"Lorem Ipsum",
     precio: 2270.00,
     cantidad:1
    },
    {
        id: "2",
        imagen: "/img/conjuntoFila.jpg",
        disponible : true,
        desc: "Conjunto de short y playera marca FILA",
        color:"Azul",
        talla:"L",
        modelo:"Lorem Ipsum",
        precio: 1258.00,
        cantidad:1
       }
]

const cartController = {
    // Listado de los productos en el carrito
    index: function (req, res) {
        res.render('cart/index', {'article':article});
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

