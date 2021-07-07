// Se importa express y path
const express = require('express');
const path = require('path');

// Se importan las rutas del subdirectorio routes/
const rutasMain = require('./routes/main');
const rutasProduct = require('./routes/product');
const rutasUser = require('./routes/user');
const rutasCart = require('./routes/cart');
const rutasAdmin = require('./routes/admin');

const app = express();  // Se almacena el objeto que devuelve express()
const PORT = 3000; // Se toma el puerto del entorno o el 3030

app.set('view engine', 'ejs');
app.use(express.static('../public'));

app.listen(PORT, () => {  // Se inicializa el servidor
    console.log("Servidor corriendo en http://localhost:" + PORT);
});

// Rutas 
app.use('/', rutasMain);
app.use('/', rutasProduct);
app.use('/', rutasUser);
/*app.use('/register', rutasUser);
app.use('/resetPassword', rutasUser);*/
app.use('/', rutasCart);
//app.use('/index', rutasCart);
app.use('/', rutasAdmin);


