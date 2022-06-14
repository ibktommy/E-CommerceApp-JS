// Requiring the layout function
const layout = require('../layout')

// Requiring the getError function from the "helpers.js" file
const { getError } = require('../../helpers')

// Function to return and exports HTML template for Signing In user
module.exports = ({ errors }) => {
  return layout({
    content: `
    <div>
      <form method="POST">
        <input name="email" type="email" placeholder="Email"/>
          ${getError(errors, 'email')}
        <input name="password" type="password" placeholder="Password"/>
          ${getError(errors, 'password')}
        <button>Login</button>
      </form>
    </div>
    `
  })
}
