const mongoose = require('mongoose')

const moviesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
    cover: String,
    poster: {
      type: String,
      required: true,
    },
    trailer: String,
    stars: String,
  },
  {
    collection: 'movies',
  }
)

const movies = mongoose.model('movies', moviesSchema)

module.exports = movies
