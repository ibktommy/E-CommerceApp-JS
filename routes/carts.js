const express = require('express')

const router = express.Router()

// ROUTE HANDLER TO ADD ITEM TO CART
router.post('/cart/products', (req, res) => {
  console.log(req.body.productId)

  res.send('Product Added to Cart!')
})

module.exports = router