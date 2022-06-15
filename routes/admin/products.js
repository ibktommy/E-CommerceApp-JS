// Require Express Library
const express = require("express");
const router = express.Router();

// Requiring the Products Repository
const productsRepo = require('../../databaseRepository/products')
// Requiring Products Template
const newProductsTemplate = require('../../views/admin/products/newProduct')

router.get('/admin/products', (req, res) => {

})

router.get('/admin/products/new', (req, res) => {
  res.send(newProductsTemplate({}))
})

module.exports = router
