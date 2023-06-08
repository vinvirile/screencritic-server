const express = require('express')
const { registerHandler, loginHandler } = require('../controller/auth')

const router = express.Router()

router.post('/register', registerHandler)
router.post('/login', loginHandler)
router.get('/auth', (req, res) => {
  // console.log(`Auth: ${req.user}`)
  res.status(201).json(req.user)
})
router.patch('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err)
    res.status(201).json({ msg: 'done' })
  })
})

module.exports = router
