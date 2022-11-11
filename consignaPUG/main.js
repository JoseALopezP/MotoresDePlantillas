const express = require('express');
const aplication = express();

//Defining Routes

//json
aplication.use(express.json());
aplication.use(express.urlencoded({ extended: true}));


aplication.set('view engine', 'pug'); // registra el motor de plantillas
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