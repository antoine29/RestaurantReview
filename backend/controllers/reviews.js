const reviewsRouter = require('express').Router()
const Review = require('../models/Review')

reviewsRouter.get('/', async (request, response) => {
	const reviews = await Review.find({}).populate('user', { reviews: 0 })
	response.json(reviews.map(review => review.toJSON()))
})

reviewsRouter.post('/', async (request, response) => {
	const body = request.body
	const review = new User(body)
	const savedReview = await review.save()
	response.json(savedReview)
})

module.exports = reviewsRouter