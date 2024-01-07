const express = require('express')
const router = express.Router()

router.post('/signup', (req, res) => {
  res.send('signup')
})

router.post('/login', (req, res) => {
  res.send('logging in')
})

router.get('/uniqueUserName', (req, res) => {
  res.send('Checking for unique username')
})

module.exports = router
