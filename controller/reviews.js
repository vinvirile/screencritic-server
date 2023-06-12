const Movies = require('../models/Movies')
const Reviews = require('../models/Reviews')
const User = require('../models/User')

const findMovie = async (movieId) => {
  const movie = await Movies.findById(movieId)

  if (!movie) {
    console.log(`Can't find movie`)
    return res.status(404).json({ success: false })
  }
}

const grabReviews = async (req, res) => {
  const movieId = req.query.m

  try {
    await findMovie(movieId)
    // Searches for the reviews in database for specific movie ID
    const findReviews = await Reviews.find({ movieId }).sort({ timestamp: -1 })

    const reviews = await Promise.all(
      findReviews.map(async (object) => {
        // translate userId of the review post to the actual username in the databse
        const user = await User.findById(object.uid)

        // reconstructing new object to pass to the client
        const newObj = {
          _id: object._id,
          uid: object.uid,
          username: user.username,
          message: object.message,
          timestamp: object.timestamp,
        }

        return newObj
      })
    )

    res.status(200).json({ arr: reviews, success: true })
  } catch (err) {
    console.log(err)
  }
}

const createReview = async (req, res) => {
  // pulling "m" query from url which is the movie's id in the database
  const movieId = req.query.m
  const reviewInput = req.body.input

  try {
    // checks to see if movie exists
    await findMovie(movieId)

    // insert into database if movie is found
    const createReview = new Reviews({
      uid: req.user._id,
      movieId: movieId,
      message: reviewInput,
      timestamp: Date.now(),
    })

    await createReview.save()

    res.status(200).json({ success: true })
  } catch (err) {
    console.log(err)
    res.status(400).json({ success: false })
  }
}

module.exports = {
  grabReviews,
  createReview,
}
