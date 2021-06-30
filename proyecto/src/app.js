// Se importa express y path
const express = require('express');
const path = require('path');

// Se importan las rutas del subdirectorio routes/
const rutasMain = require('./routes/main');
const rutasProduct = require('./routes/product');
const rutasUser = require('./routes/user');

const app = express();  // Se almacena el objeto que devuelve express()
const PORT = 3000; // Se toma el puerto del entorno o el 3030

app.set('view engine', 'ejs');
app.use(express.static('../public'));

app.listen(PORT, () => {  // Se inicializa el servidor
    console.log("Servidor corriendo en http://localhost:" + PORT);
});

// Rutas 
app.use('/', rutasMain);
app.use('/product-detail', rutasProduct);
app.use('/', rutasUser);
app.use('/register', rutasUser);
app.use('/resetPassword', rutasUser);

app.get('/privacidad', (req, res) => {
    res.sendFile(path.resolve('views/privacidad.html'));
});

app.get('/legal', (req, res) => {
    res.sendFile(path.resolve('views/legal.html'));
});

app.get('/terminos', (req, res) => {
    res.sendFile(path.resolve('views/terminos.html'));
});

app.get('/cartNV', (req, res) => {
    //res.sendFile(path.join(__dirname, '/views/index.html'));
    res.sendFile(path.resolve('views/carritoNV.html'));
});


app.get('/cart', (req, res) => {
    //res.sendFile(path.join(__dirname, '/views/index.html'));
    res.sendFile(path.resolve('views/carritoVacio.html'));
});