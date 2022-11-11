const express = require('express');
const aplication = express();
const handlebars = require('express-handlebars');
const Container = require('./Container.js');


//json
aplication.use(express.json());
aplication.use(express.urlencoded({ extended: true}));

aplication.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views'
  }));
  
aplication.set('view engine', 'hbs'); // registra el motor de plantillas
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
      products: productsList
    });
});
  
aplication.post('/products', (request, response) => {
    const product = request.body;
    products.save(product);
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