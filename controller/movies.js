const Movies = require('../models/Movies')

const grabMovies = async (req, res) => {
  try {
    const movieData = await Movies.find({})
    return res.status(200).json({ movies: movieData })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ err })
  }
}

module.exports = { grabMovies }
