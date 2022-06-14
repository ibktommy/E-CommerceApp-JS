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
        throw new Error('Your Passwords do not Match!')
      }
    })
}

