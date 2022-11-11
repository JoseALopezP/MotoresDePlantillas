const express = require('express');
const { Router } = express;
const aplication = express();
const handlebars = require('express-handlebars');

//Defining Routes
const routeProducts = Router();

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

class Container {
    constructor(products){
        this.products = products;
    }

    save(object) {
        const id = 1;
        console.log(object);
        this.products.forEach(element => {
            if(element.id >= id){
                id = element.id + 1;
            }
        });
        object.id = id;
        this.products.push(object);
        return id;
    }

    getById(id){
        let selectedObject = null;
        this.products.forEach(element =>{
            if(element.id == id) {
                selectedObject = element;
            }
        });
        return selectedObject;
    }

    getAll() {
        return this.products;
    }

    deleteById(id) {
        let indexSelected = -1;
        this.products.forEach((element, index) => {
            if(element.id == id) {
                indexSelected = index;
            }
        });
        if (indexSelected != -1) {
            this.products.splice(indexSelected, 1);
        }
    }

    deleteAll() {
        this.products = [];
    }

}

const products = new Container([]);

//Testing


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