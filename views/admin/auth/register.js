// Requiring the layout function
const layout = require('../layout')

// Creating Function that returns the error message in valiadting user account
const getError = (errors, prop) => {
  try {
    return errors.mapped()[prop].msg
  } catch (err) {
    return ""
  }
}

// Function to return and exports HTML template for registering user
module.exports = ({ req, errors }) => {
  return layout({
    content: `
      <div>
        Your User ID is: ${req.session.userID}
        <form method="POST">
          <input name="email" type="email" placeholder="Email"/>
          ${getError(errors, 'email')}
          <input name="password" type="password" placeholder="Password"/>
          ${getError(errors, 'password')}
          <input name="confirmPassword" type="password" placeholder="Confirm Password"/>
          ${getError(errors, 'confirmPassword')}
          <button>Register An Account</button>
        </form>
      </div>
    `
  })
}