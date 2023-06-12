require('dotenv').config()
const express = require('express')
const cors = require('cors')
const passport = require('passport')
const session = require('express-session')
const connect = require('./db/connect')
const app = express()
const reviewsRoute = require('./routes/reviews')
const moviesRoute = require('./routes/movies')
const authRoute = require('./routes/auth')

//base variables
const PORT = process.env.PORT || 7000
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'http://localhost:5173'

// cors setup
app.use(
  cors({
    origin: ALLOWED_ORIGIN,
    credentials: true,
  })
)

// to handle json requests
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(
  session({
    secret: process.env.ACCESS_TOKEN_SECRET,
    resave: true,
    saveUninitialized: true,
  })
)

// enables passport in server
app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')(passport)

//routes
app.use('/api/', authRoute)
app.use('/api/movies/', moviesRoute)
app.use('/api/reviews/', reviewsRoute)

// Tries to connect to site's database. The server will not run if there is issues connecting to database.
const start = async () => {
  try {
    await connect
    app.listen(PORT, () => {
      console.log(`Running on port ${PORT}`)
    })
  } catch (err) {
    console.log(err)
  }
}

// starts the server
start()
