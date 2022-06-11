// Require Express Library - Creates An Exress Application
const express = require('express')

// Linking the Express App to our Routes-Auth
const authRouter = require('./routes/admin/auth')

// A Global Middleware Function that runs before we make request
const bodyParser = require('body-parser')

// Require Cookie-Session Library - Also A Middleware
const cookiesSession = require('cookie-session')

// Creating App Object that Contains all the things the web server can do
const app = express()

// Automatically calling the bodyParser Middleware function in every single Route Handlers
app.use(bodyParser.urlencoded({ extended: true }))

// Automatically calling the Cookie-Session Middleware function in every single Route Handlers
app.use(cookiesSession({
  keys: ['dg34uigfhf8rydh32']
}))

//Hookng Up the Router to our App Object
app.use(authRouter)



// Let App Listen for Incoming Network Request from the browser
app.listen(5000, () => {
  console.log('App is Listening for Request')
})