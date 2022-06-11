// Require Express Library
const express = require('express')

// A Global Middleware Function that runs before we make request
const bodyParser = require('body-parser')

// Require Cookie-Session Library - Also A Middleware
const cookiesSession = require('cookie-session')

// Require the UsersRepository Class
const usersRepo = require('./databaseRepository/users')

// Creating App Object that Contains all the things the web server can do
const app = express()

// Automatically calling the bodyParser Middleware function in every single Route Handlers
app.use(bodyParser.urlencoded({ extended: true }))
// Automatically calling the Cookie-Session Middleware function in every single Route Handlers
app.use(cookiesSession({
  keys: ['dg34uigfhf8rydh32']
}))

// Route Handler - Letting the Web Server know what to do when it receives a Network Request from the Browser
app.get('/register', (req, res) => {
  res.send(`
    <div>
      Your User ID is: ${req.session.userID}
      <form method="POST">
        <input name="email" type="email" placeholder="Email"/>
        <input name="password" type="password" placeholder="Password"/>
        <input name="confirmPassword" type="password" placeholder="Confirm Password"/>
        <button>Sign Up</button>
      </form>
    </div>
  `)
})

// Creating A Post request for the Web Server
app.post('/register', async (req, res) => {
  const { email, password, confirmPassword } = req.body

  // Validating user email - if it exist already
  const existingUser = await usersRepo.getOneByKeyValueContent({ email })

  // Condition to check if email already exist in the Users Database
  if (existingUser) {
    return res.send('This Email has been used by another User, register with another email')
  }

  // Condition to check if user password is inputted correctly
  if (password !== confirmPassword) {
    return res.send('Passwords Do not Match!')
  }

  // Create A User in the User_Repo to represent a valid User
  const user = await usersRepo.create({ email, password })

  // Store the ID of the validated user inside the users cookies
  req.session.userID = user.id  //Added by cookie-session

  res.send('Account Created!')
})

// Let App Listen for Incoming Network Request from the browser
app.listen(5000, () => {
  console.log('App is Listening for Request')
})