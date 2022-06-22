const express = require('express')
const cartsRepo = require('../databaseRepository/carts')

const router = express.Router()

// ROUTE HANDLER TO ADD ITEM TO CART
router.post('/cart/products', async (req, res) => {
  // Condition to Check if Cart Data Exists
  let cart;
  if (!req.session.cartId) {
    cart = await cartsRepo.create({ items: [] })
    req.session.cartId = cart.id
  } else {
    cart = await cartsRepo.getOne(req.session.cartId)
  }

  console.log(cart)

  res.send('Product Added to Cart!')
})

module.exports = router