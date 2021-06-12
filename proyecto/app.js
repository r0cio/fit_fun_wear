// Se importa express y path
const express = require('express');
const path = require('path');

const app = express();  // Se almacena el objeto que devuelve express()
const PORT = 3000; // Se toma el puerto del entorno o el 3030
app.use(express.static('public'));

app.listen(PORT, () => {  // Se inicializa el servidor
    console.log("Servidor corriendo en http://localhost:" + PORT);
});

// Rutas 
app.get('/', (req, res) => {
    //res.sendFile(path.join(__dirname, '/views/index.html'));
    res.sendFile(path.resolve('views/index.html'));
});