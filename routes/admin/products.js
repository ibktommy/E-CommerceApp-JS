// Require Express Library
const express = require("express");
const router = express.Router();

// Requiring the Products Repository
const productsRepo = require('../../databaseRepository/products')

router.get('./admin/products', (req, res) => {

})

router.get('./admin/products.new', (req, res) => {

})

module.exports = router
