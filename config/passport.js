const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')
const bcrypt = require('bcrypt')

module.exports = (passport) => {
  passport.use(
    // Create a Passport Local Strategy
    new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        // search for user with email
        const user = await User.findOne({ email })

        // checks to see if user already exist
        if (!user) return done(null, false, { message: 'Cannot find user!' })

        // check to see if password matches records
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch)
          return done(null, false, { message: 'Password is incorrect!' })

        return done(null, user)
      }
    )
  )

  // stores user into session
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  // grabs entire user object from database
  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id)
    if (user) done(null, user)
  })
}
