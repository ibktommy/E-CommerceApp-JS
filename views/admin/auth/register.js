// Requiring the layout function
const layout = require('../layout')

// Function to return and exports HTML template for registering user
module.exports = ({ req , errors }) => {
  return layout({ 
    content: `
      <div>
        Your User ID is: ${req.session.userID}
        <form method="POST">
          <input name="email" type="email" placeholder="Email"/>
          <input name="password" type="password" placeholder="Password"/>
          <input name="confirmPassword" type="password" placeholder="Confirm Password"/>
          <button>Register An Account</button>
        </form>
      </div>
    `
   })
}