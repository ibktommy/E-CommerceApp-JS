// Require Express Library
const express = require("express");
const router = express.Router();

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
router.post("/register", async (req, res) => {
	const { email, password, confirmPassword } = req.body;

	// Validating user email - if it exist already
	const existingUser = await usersRepo.getOneByKeyValueContent({ email });

	// Condition to check if email already exist in the Users Database
	if (existingUser) {
		return res.send(
			"This Email has been used by another User, register with another email",
		);
	}

	// Condition to check if user password is inputted correctly
	if (password !== confirmPassword) {
		return res.send("Passwords Do not Match!");
	}

	// Create A User in the User_Repo to represent a valid User
	const user = await usersRepo.create({ email, password });

	// Store the ID of the validated user inside the users cookies
	req.session.userID = user.id; //Added by cookie-session

	res.send("Account Created!");
});

// LOGGING IN USER
router.get("/login", (req, res) => {
	res.send(loginTemplate());
});
// Post Request Handler when User Logins to Account
router.post("/login", async (req, res) => {
	const { email, password } = req.body;

	// Getting A User Based on the email passed
	const user = await usersRepo.getOneByKeyValueContent({ email });

	// Condition to check if email already exist in the Users Database
	if (!user) {
		return res.send("Email Not Found!");
	}

	// Condition to check if user password is Valid
	const validPassword = await usersRepo.comparePasswords(
		user.password,
		password,
	);
	if (!validPassword) {
		return res.send("Password Is Invalid!");
	}

	// Store the ID of the validated user inside the users cookies
	req.session.userID = user.id; //Added by cookie-session

	res.send("You Have Succesfully Logged In");
});

// Logging Out the User
router.get("/logout", async (req, res) => {
	req.session = null;
	res.send("You have been logged Out!");
});

// Exporting the Router from Express - it gives us access to use the express-app object
module.exports = router;
