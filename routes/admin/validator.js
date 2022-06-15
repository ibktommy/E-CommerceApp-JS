// Requiring the Express Validator
const { check } = require("express-validator");

// Require the UsersRepository Class
const usersRepo = require("../../databaseRepository/users");

module.exports = {
  requireEmail: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Enter A Valid Email!")
    .custom(async (email) => {
      // Validating user email - if it exist already
      const existingUser = await usersRepo.getOneByKeyValueContent({ email });
      // Condition to check if email already exist in the Users Database
      if (existingUser) {
        throw new Error(
          "This Email has been used by another User, register with another email",
        );
      }
    }),
  requirePassword: check("password")
    .trim()
    .isLength({ min: 5, max: 20 })
    .withMessage(
      "Your Password must be a mininim of 4 characters or maximum character of 20",
    ),
  requireConfirmPassword: check("confirmPassword")
    .trim()
    .isLength({ min: 5, max: 20 })
    .withMessage(
      "Your Password must be a mininim of 4 characters or maximum character of 20",
    )
    .custom((confirmPassword, { req }) => {
      if (confirmPassword !== req.body.password) {
        throw new Error("Your Passwords do not Match!");
      }
    }),
  requireEmailExists: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Enter A Valid Email")
    // Condition to check if email already exist in the Users Database
    .custom(async (email) => {
      const user = await usersRepo.getOneByKeyValueContent({ email });

      if (!user) {
        throw new Error("Email not Found!");
      }
    }),
  requireValidPasswordUser: check("password")
    .trim()
    .custom(async (password, { req }) => {
      const user = await usersRepo.getOneByKeyValueContent({
        email: req.body.email,
      });

      // Checking if user exist
      if (!user) {
        throw new Error("Invalid Password!");
      }

      const validPassword = await usersRepo.comparePasswords(
        user.password,
        password,
      );
      // Condition to check if user password is Valid
      if (!validPassword) {
        throw new Error("Invalid Password!");
      }
    }),
  requireTitle: check("title").trim().isLength({ min: 3, max: 20 }),
  requirePrice: check("price").trim().toFloat().isFloat({ min: 2 }),
};
