// Require Express Library
const express = require('express')
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

// Creating A Middleware Function that runs before we make request
const bodyParser = (req, res, next) => {
  if (req.method === 'POST') {
    req.on('data', data => {
      // console.log(data.toString('utf8'))
      const parsed = data.toString('utf8').split('&')
      const formData = {}
      // For Loop to iterate over "Parsed Array"
      for (let pair of parsed) {
        const [key, value] = pair.split('=')
        formData[key] = value;
      }
      req.body = formData
      next()  // Next function indicates Express can proceed with its request
    })
  } else {
    next()
  }
}

// Creating A Post request for the Web Server
app.post('/', bodyParser, (req, res) => {
  console.log(req.body)
  res.send('Account Created!')
})

// Let App Listen for incoming Network Request from the browser
app.listen(5000, () => {
  console.log('App is Listening for Request')
})