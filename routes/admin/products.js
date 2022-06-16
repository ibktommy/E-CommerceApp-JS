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

router.get("/admin/products", (req, res) => {});

// Route Handler - PASSING A NETWORK REQUEST TO THE SERVER FROM THE BROWSER WHEN ON THE "CREATE-NEW-PRODUCT-PAGE"
router.get("/admin/products/new", (req, res) => {
	res.send(newProductsTemplate({}));
});
// Route Handler - PASSING NETWORK REQUEST FROM THE SERVER BACK TO THE BROWSER
router.post(
	"/admin/products/new",
	[requireTitle, requirePrice],
	upload.single("image"),
	(req, res) => {
		const errors = validationResult(req);

		console.log(req.file);

		res.send("Product Created!");
	},
);

module.exports = router;
