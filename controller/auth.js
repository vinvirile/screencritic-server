const bcrypt = require('bcrypt')
const User = require('../models/User')
const passport = require('passport')

const registerHandler = async (req, res) => {
  try {
    // destruct values from the request body
    const { email, username, password } = req.body

    // checks to see if any value is "FALSEY"
    if (!email || !username || !password)
      return res.status(400).json({ errMsg: 'All fields are required' })

    //check to see if username or email exists
    const doesEmailExist = await User.findOne({ email })
    const doesUserExist = await User.findOne({ username })

    if (doesEmailExist)
      return res
        .status(400)
        .json({ errMsg: 'Email already exists!', success: false })

    if (doesUserExist)
      return res
        .status(400)
        .json({ errMsg: 'User already exists!', success: false })

    // If all criteria is met, Insert User into mongoose database
    const createUser = new User({
      email,
      username,
      password,
    })

    // Password is encrypted before inserted
    await createUser.save()
    return res.status(201).json({ success: true })
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json({ errMsg: 'An unexpected error has occured!', success: false })
  }
}

const loginHandler = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) throw err
    if (!user)
      return res
        .status(404)
        .json({ errMsg: 'User does not exist!', success: false })

    req.logIn(user, (err) => {
      if (err) throw err
      res.status(201).json({ success: true })
      console.log(req.user)
    })
  })(req, res, next)
}

module.exports = { registerHandler, loginHandler }
