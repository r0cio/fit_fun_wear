// Se importa express y path
const express = require('express');
const methodOverride = require('method-override');

// Se importan las rutas del subdirectorio routes/
const rutasMain = require('./routes/main');
const rutasProduct = require('./routes/product');
const rutasUser = require('./routes/user');
const rutasCart = require('./routes/cart');

const app = express();  // Se almacena el objeto que devuelve express()
const PORT = 3000; // Se toma el puerto 3000

// Configuraciones
app.set('view engine', 'ejs');
app.use(express.static('../public'));
app.use(express.urlencoded({ extended: false }));
//app.use(logger('dev'));
app.use(express.json());
//app.use(cookieParser());
app.use(methodOverride('_method')); // Para sobrescribir el method="POST" en el formulario por PUT y DELETE


// Se inicializa el servidor
app.listen(PORT, () => {
    console.log("Servidor corriendo en http://localhost:" + PORT);
});

// Rutas 
app.use('/', rutasMain);
app.use('/products', rutasProduct);
app.use('/user', rutasUser);
app.use('/cart', rutasCart);

// Ruta para el error 404
app.use(function (req, res, next) {
    res.status(404).render('main/error-404');
})