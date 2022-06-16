// Require Express Library
const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

// Requiring the Products Repository
const productsRepo = require("../../databaseRepository/products");
// Requiring Products Template
const newProductsTemplate = require("../../views/admin/products/newProduct");
// Requiring the Validation Methods
const { requireTitle, requirePrice } = require("./validator");

router.get("/admin/products", (req, res) => { });

// Route Handler - PASSING A NETWORK REQUEST TO THE SERVER FROM THE BROWSER WHEN ON THE "CREATE-NEW-PRODUCT-PAGE"
router.get("/admin/products/new", (req, res) => {
  res.send(newProductsTemplate({}));
});
// Route Handler - PASSING NETWORK REQUEST FROM THE SERVER BACK TO THE BROWSER
router.post(
  "/admin/products/new",
  upload.single("image"),
  [requireTitle, requirePrice],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.send(newProductsTemplate({ errors }))
    }

    const image = req.file.buffer.toString('base64');
    const { title, price } = req.body
    await productsRepo.create({ title, price, image })

    res.send("Product Created!");
  },
);

module.exports = router;
