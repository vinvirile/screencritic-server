const mongoose = require('mongoose')

const ReviewsSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
  },
  movieId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
    default: Date.now(),
  },
})

module.exports = mongoose.model('review', ReviewsSchema)
