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

module.exports = Container;