// Require Express Library
const express = require('express')

// A Global Middleware Function that runs before we make request
const bodyParser = require('body-parser')

// Creating App Object that Contains all the things the web server can do
const app = express()

// Automatically calling the bodyParser Middleware function in every single Route Handlers
app.use(bodyParser.urlencoded({ extended: true }))

// Route Handler - Letting the Web Server know what to do when it receives a Network Request from the Browser
app.get('/', (req, res) => {
  res.send(`
    <div>
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
app.post('/',  (req, res) => {
  console.log(req.body)
  res.send('Account Created!')
})

// Let App Listen for incoming Network Request from the browser
app.listen(5000, () => {
  console.log('App is Listening for Request')
})