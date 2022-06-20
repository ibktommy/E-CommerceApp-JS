// Require Express Library
const express = require("express");
const router = express.Router();
const { handleErrors, requireAuth } = require("./customMiddleware"); // Requiring the custom-Middleware Function
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

// Requiring the Products Repository
const productsRepo = require("../../databaseRepository/products");
// Requiring New Products Template
const newProductsTemplate = require("../../views/admin/products/newProduct");
// Requiring Products List Template
const listProductsTemplate = require("../../views/admin/products/index");
// Requiring Edit-Product Template
const editProductsTemplate = require("../../views/admin/products/editProduct");
// Requiring the Validation Methods
const { requireTitle, requirePrice } = require("./validator");

// PRODUCT PAGE ROUTE HANDLERS
router.get("/admin/products", requireAuth, async (req, res) => {
  // Get All Existing Products
  const products = await productsRepo.getAll()
  // Sending Product-List from the Products Database to the Browser
  res.send(listProductsTemplate({ products }))
});

// Route Handler - PASSING A NETWORK REQUEST TO THE SERVER FROM THE BROWSER WHEN ON THE "CREATE-NEW-PRODUCT-PAGE"
router.get("/admin/products/new", requireAuth, (req, res) => {
  res.send(newProductsTemplate({}));
});
// Route Handler - PASSING NETWORK REQUEST FROM THE SERVER BACK TO THE BROWSER
router.post(
  "/admin/products/new",
  requireAuth,
  upload.single("image"),
  [requireTitle, requirePrice],
  handleErrors(newProductsTemplate), // Condition to check if an errors exists in the validation Result
  async (req, res) => {
    // const image = req.file.buffer.toString("base64");
    const { title, price } = req.body;
    await productsRepo.create({ title, price });

    // Redirect To Product-Index Page After Creating A New Product
    res.redirect('/admin/products')
  },
);

// EDITING PRODUCT ROUTE HANDLER
router.get('admin/products/:id/edit', async (req, res) => {
  const product = await productsRepo.getOne(req.params.id)

  if (!product) {
    return res.send('Product Not Found!')
  }

  res.send(editProductsTemplate({ product }))
})

module.exports = router;
