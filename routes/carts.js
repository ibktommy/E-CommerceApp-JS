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

  // Add a new product to Cart-Items Array or increment existing quantity for existing product
  const existingItem = cart.items.find(item => item.id === req.body.productId)
  if (existingItem) {
    // Inrement Quantity and sae Cart
    existingItem.quantity++;
  } else {
    // Add new Product id to items Array
    cart.items.push({ id: req.body.productId, quantity: 1 })
  }

  // Update Cart Items
  await cartsRepo.update(cart.id, { items: cart.items })

  res.send('Product Added to Cart!')
})

module.exports = router