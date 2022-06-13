// Requiring the layout function
const layout = require('../layout')

// Function to return and exports HTML template for Signing In user
module.exports = () => {
  return layout({
    content: `
    <div>
      <form method="POST">
        <input name="email" type="email" placeholder="Email"/>
        <input name="password" type="password" placeholder="Password"/>
        <button>Login</button>
      </form>
    </div>
    `
  })
}
