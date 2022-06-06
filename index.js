// Require Express Library
const express = require('express')

// A Global Middleware Function that runs before we make request
const bodyParser = require('body-parser')

const res = require('express/lib/response')

// Creating App Object that Contains all the things the web server can do
const app = express()

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
app.post('/', bodyParser.urlencoded({ extended: true }), (req, res) => {
  console.log(req.body)
  res.send('Account Created!')
})

// Let App Listen for incoming Network Request from the browser
app.listen(5000, () => {
  console.log('App is Listening for Request')
})