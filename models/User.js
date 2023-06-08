const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: String,
    default: new Date(),
  },
})

// middleware that encrypts password
UserSchema.pre('save', async function (next) {
  // only hash the password if it has been modified
  if (!this.isModified('password')) return next()

  try {
    // generate salt
    const salt = await bcrypt.genSalt(10)

    // hash the password
    const hashedPassword = await bcrypt.hash(this.password, salt)

    this.password = hashedPassword
    next()
  } catch (err) {
    return next(err)
  }
})

module.exports = mongoose.model('user', UserSchema)
