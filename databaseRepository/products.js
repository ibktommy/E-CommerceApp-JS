// Requiring the Repository Based Class
const Repository = require('./repository')

class ProductsRepository extends Repository {

}

// Creating an Instance of Products-Repository
module.exports = new ProductsRepository('products.json')