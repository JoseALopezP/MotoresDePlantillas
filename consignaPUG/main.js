const express = require('express');
const aplication = express();
const Container = require('./Container.js');

//json
aplication.use(express.json());
aplication.use(express.urlencoded({ extended: true}));


aplication.set('view engine', 'pug'); // registra el motor de plantillas
aplication.set('views', './views');

//Public
aplication.use(express.static(__dirname + '/public'));

//Routes
const port = 8080;

const products = new Container([]);

//Endpoints
aplication.get('/products', (request, response) => {
    const productsList = products.getAll();
    response.render('list', {
      productos: productsList
    });
});
  
aplication.post('/products', (request, response) => {
    const producto = request.body;
    productos.save(producto);
    response.render('forms', {});
});
  
aplication.get('/', (request, response) => {
    response.render('forms', {});
});



//Server
const server = aplication.listen(port, () => {
    console.log(`Server listening to: ${server.address().port}`);
});

server.on('error', error => console.log(`Error: ${error}`));