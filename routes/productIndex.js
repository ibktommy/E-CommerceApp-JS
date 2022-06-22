const express = require('express')
const productsRepo = require('../databaseRepository/products')
const productIndexTemplate = require('../views/products/index')

const router = express.Router()

// ROUTE HANDLER FOR THE ROOT-PAGE DIRECTORY
router.get('/', async (req, res) => {
  const products = await productsRepo.getAll()
  res.send(productIndexTemplate({ products }))
})

module.exports = router