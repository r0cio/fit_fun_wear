// Se importa express y path
const express = require('express');
const path = require('path');

const app = express();  // Se almacena el objeto que devuelve express()
const PORT = 3000; // Se toma el puerto del entorno o el 3030
app.use(express.static('public'));

app.listen(PORT, () => {  // Se inicializa el servidor
    console.log("Servidor corriendo en http://localhost:" + PORT);
});

app.set('view engine', 'ejs');

// Rutas 
app.get('/', (req, res) => {
    //res.sendFile(path.join(__dirname, '/views/index.html'));
    res.sendFile(path.resolve('views/index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.resolve('views/login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.resolve('views/register.html'));
});

app.get('/privacidad', (req, res) => {
    res.sendFile(path.resolve('views/privacidad.html'));
});

app.get('/legal', (req, res) => {
    res.sendFile(path.resolve('views/legal.html'));
});

app.get('/terminos', (req, res) => {
    res.sendFile(path.resolve('views/terminos.html'));
});

app.get('/resetPassword', (req, res) => {
    res.sendFile(path.resolve('views/resetPassword.html'));
});

app.get('/cartNV', (req, res) => {
    //res.sendFile(path.join(__dirname, '/views/index.html'));
    res.sendFile(path.resolve('views/carritoNV.html'));
});


app.get('/cart', (req, res) => {
    //res.sendFile(path.join(__dirname, '/views/index.html'));
    res.sendFile(path.resolve('views/carritoVacio.html'));
});

app.get('/product-detail', (req, res) => {
    res.sendFile(path.resolve('views/product-detail.html'));
});