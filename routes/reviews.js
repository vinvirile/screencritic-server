const express = require('express')
const { grabReviews, createReview } = require('../controller/reviews')
const { authRequired } = require('../middleware/auth')
const router = express.Router()

router.get('/data', grabReviews)
router.post('/create', authRequired, createReview)

module.exports = router
