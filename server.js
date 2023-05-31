require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connect = require('./db/connect')
const app = express()
const moviesRoute = require('./routes/movies')

//base variables
const PORT = process.env.PORT || 7000

// cors setup
app.use(
  cors({
    origin: 'https://screencritics.virile.vin',
    AccessControlAllowOrigin: true,
  })
)

//routes
app.use('/api/movies/', moviesRoute)

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

start()
