// Require Express Library
const express = require("express");
const router = express.Router();
const { handleErrors } = require("./customMiddleware"); // Requiring the custom-Middleware Function
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

// Requiring the Products Repository
const productsRepo = require("../../databaseRepository/products");
// Requiring Products Template
const newProductsTemplate = require("../../views/admin/products/newProduct");
// Requiring the Validation Methods
const { requireTitle, requirePrice } = require("./validator");

router.get("/admin/products", async (req, res) => { 
  // Get All Existing Products
  const products = await productsRepo.getAll()
});

// Route Handler - PASSING A NETWORK REQUEST TO THE SERVER FROM THE BROWSER WHEN ON THE "CREATE-NEW-PRODUCT-PAGE"
router.get("/admin/products/new", (req, res) => {
  res.send(newProductsTemplate({}));
});
// Route Handler - PASSING NETWORK REQUEST FROM THE SERVER BACK TO THE BROWSER
router.post(
  "/admin/products/new",
  upload.single("image"),
  [requireTitle, requirePrice],
  handleErrors(newProductsTemplate), // Condition to check if an errors exists in the validation Result
  async (req, res) => {
    const image = req.file.buffer.toString("base64");
    const { title, price } = req.body;
    await productsRepo.create({ title, price, image });

    res.send("Product Created!");
  },
);

module.exports = router;
