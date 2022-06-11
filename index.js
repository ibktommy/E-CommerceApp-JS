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
        <button>Register An Account</button>
      </form>
    </div>
  `)
})

// Creating A Post request for the Web Server
// Post Request Handler When User Registers An Account
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

// Logging In User
app.get('/login', (req, res) => {
  res.send(`
    <div>
      <form method="POST">
        <input name="email" type="email" placeholder="Email"/>
        <input name="password" type="password" placeholder="Password"/>
        <button>Login</button>
      </form>
    </div>
  `)
})
// Post Request Handler when User Logins to Account
app.post('/login', async (req, res) => {
  const { email, password } = req.body

  // Getting A User Based on the email passed
  const user = await usersRepo.getOneByKeyValueContent({ email })

  // Condition to check if email already exist in the Users Database
  if (!user) {
    return res.send('Email Not Found!')
  }

  // Condition to check if user password is Valid
  if (user.password !== password) {
    return res.send('Password Is Invalid!')
  }

  // Store the ID of the validated user inside the users cookies
  req.session.userID = user.id  //Added by cookie-session

  res.send('You Have Succesfully Logged In')
})

// Logging Out the User
app.get('/logout', async (req, res) => {
  req.session = null
  res.send('You have been logged Out!')
})

// Let App Listen for Incoming Network Request from the browser
app.listen(5000, () => {
  console.log('App is Listening for Request')
})