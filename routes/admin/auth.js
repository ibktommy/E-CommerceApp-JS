// Require Express Library
const express = require("express");
const router = express.Router();

// Requiring the Express Validator
const { handleErrors } = require("./customMiddleware");
const {
	requireEmail,
	requirePassword,
	requireConfirmPassword,
	requireEmailExists,
	requireValidPasswordUser,
} = require("./validator");

// Require the UsersRepository Class
const usersRepo = require("../../databaseRepository/users");

// Requiring the Register and Login HTML template
const registerTemplate = require("../../views/admin/auth/register");
const loginTemplate = require("../../views/admin/auth/login");

// Route Handler - PASSING A NETWORK REQUEST TO THE SERVER FROM THE BROWSER WHEN ON THE REGISTER-USER PAGE
router.get("/register", (req, res) => {
	res.send(registerTemplate({ req }));
});

// Creating A Post request for the Web Server
// Post Request Handler When User Registers An Account
router.post(
	"/register",

	[
		// Checking Email With Express-Validator
		requireEmail,
		// Checking Password With Express-Validator
		requirePassword,
		// Checking confirmPassword With Express-Validator
		requireConfirmPassword,
	],
	// Condition to check if an errors exists in the validation Result
	handleErrors(registerTemplate),

	async (req, res) => {
		const { email, password } = req.body;
		// Create A User in the User-Repository to represent a valid User
		const user = await usersRepo.create({ email, password });

		// Store the ID of the validated user inside the users cookies
		//Added by cookie-session
		req.session.userId = user.id;

		// Redirect To Product-Index Page After Creating A New Product
		res.redirect('/admin/products')
	},
);

// LOGGING IN USER
router.get("/login", (req, res) => {
	res.send(loginTemplate({}));
});
// Post Request Handler when User Logins to Account
router.post(
	"/login",
	[
		// Validating User Email
		requireEmailExists,
		// Validating User Password
		requireValidPasswordUser,
	],
	// Condition to check if an errors exists in the validation Result
	handleErrors(loginTemplate),

	async (req, res) => {
		const { email } = req.body;

		// Getting A User Based on the email passed
		const user = await usersRepo.getOneByKeyValueContent({ email });

		// Store the ID of the validated user inside the users cookies
		//Added by cookie-session
		req.session.userID = user.id;

		// Redirect To Product-Index Page After Creating A New Product
		res.redirect('/admin/products')
	},
);

// LOGGING OUT USER
router.get("/logout", async (req, res) => {
	req.session = null;
	res.send("You have been logged Out!");
});

// Exporting the Router from Express - it gives us access to use the express-app object
module.exports = router;
