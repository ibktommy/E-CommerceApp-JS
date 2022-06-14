// Require Express Library
const express = require("express");
const router = express.Router();

// Requiring the Express Validator
const { check, validationResult } = require("express-validator");
const {
	requireEmail,
	requirePassword,
	requireConfirmPassword,
	requireEmailExists,
	requireValidPasswordUser
} = require("./validator");

// Require the UsersRepository Class
const usersRepo = require("../../databaseRepository/users");

// Requiring the Register and Login HTML template
const registerTemplate = require("../../views/admin/auth/register");
const loginTemplate = require("../../views/admin/auth/login");

// Route Handler - Letting the Web Server know what to do when it receives a Network Request from the Browser
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

	async (req, res) => {
		const errors = validationResult(req);

		// Condition to check if an errors exists in the validationResult
		if (!errors.isEmpty()) {
			return res.send(registerTemplate({ req, errors }));
		}

		const { email, password, confirmPassword } = req.body;
		// Create A User in the User_Repo to represent a valid User
		const user = await usersRepo.create({ email, password });

		// Store the ID of the validated user inside the users cookies
		req.session.userID = user.id; //Added by cookie-session

		res.send("Account Created!");
	},
);

// LOGGING IN USER
router.get("/login", (req, res) => {
	res.send(loginTemplate());
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

	async (req, res) => {
		const errors = validationResult(req);
		console.log(errors);

		const { email } = req.body;

		// Getting A User Based on the email passed
		const user = await usersRepo.getOneByKeyValueContent({ email });

		// Store the ID of the validated user inside the users cookies
		// req.session.userID = user.id; //Added by cookie-session

		res.send("You Have Succesfully Logged In");
	},
);

// LOGGING OUT USER
router.get("/logout", async (req, res) => {
	req.session = null;
	res.send("You have been logged Out!");
});

// Exporting the Router from Express - it gives us access to use the express-app object
module.exports = router;
