// Require Express Library
const express = require('express')
const res = require('express/lib/response')

// Creating App Object that Contains all the things the web server can do
const app = express()

// Route Handler - Letting the Web Server know what to do when it receives a Network Request from the Browser
app.get('/', (req, res) => {
  res.send('Hi there! from your local Web Server :)')
})

// Let App Listen for incoming Network Request from the browser
app.listen(5000, () => {
  console.log('App is Listening for Request')
})