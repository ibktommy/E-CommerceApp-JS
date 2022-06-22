const express = require('express')

const router = express.Router()

// ROUTE HANDLER FOR THE ROOT-PAGE DIRECTORY
router.get('/', async (req, res) => {
  res.send("Products")
})

module.exports = router