const userrepository = require('../database/userrepository')
const jwt = require('jsonwebtoken')
const registerUser = async (req, res) => {
  try {
    const useremail = req.body.email
    const userpassword = req.body.password
    const username = req.body.username
    // const userDOB = req.body.DOB
    const user = await userrepository.registerUser(useremail, userpassword, username)
    res.status(200).json({ user, message: 'User registered successfully', status: 'success' })
  } catch (error) {
    res.status(500).send('Error registering user\t' + error.message)
  }
}

const loginUser = async (req, res) => {
  try {
    const useremail = req.body.email
    const userpassword = req.body.password
    const user = await userrepository.loginUser(useremail, userpassword)
    // console.log(process.env.JWT_SECRET)
    // console.log(user)
    const token = jwt.sign({ userId: user.user_id, role: user.role.name, preferredLanguage: user.user_preferred_language.name }, process.env.JWT_SECRET, { expiresIn: '24h' })
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'none',
      secure: true
    })
    res.status(200).json({ user, status: 'success', message: 'Login was successful' })
  } catch (error) {
    res.status(500).send('Error logging in\t' + error.message)
  }
}
module.exports = {
  registerUser,
  loginUser
}
