// Requiring the Repository Based Class
const Repository = require('./repository')

// Creating a single class that will be responsible for accessing and managing products data
class CartsRepository extends Repository {

}

// Creating an Instance of Products-Repository
module.exports = new CartsRepository('carts.json')