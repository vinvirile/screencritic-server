const express = require('express')
const router = express.Router()
const { grabMovies } = require('../controller/movies')

router.route('/data').get(grabMovies)

module.exports = router
