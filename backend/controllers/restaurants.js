const restaurantsRouter = require('express').Router()
const Restaurant = require('../models/Restaurant')
const Review = require('../models/Review')
const User = require('../models/User')

restaurantsRouter.get('/', async (req, res) => {
	const blogs = await Restaurant.find({})
	return res.json(blogs)
})

restaurantsRouter.get('/:id', async (req, res) => {
	const restaurantId = req.params.id
	const restaurant = await Restaurant.findById(restaurantId)
	return restaurant ? res.json(restaurant) : res.status(404).end()
})

restaurantsRouter.post('/', async (req, res) => {
	try {
		if (!req.user) return res.status(401).json({ error: 'Missing auth information.'})
		const user = await User.findById(req.user.id)
		if(user.role !== 'owner') return res.status(403).json({ error: 'Not allowed operation.'})
		const newRestaurant = new Restaurant({
			name: req.body.name,
			address: req.body.address,
			addressurl: req.body.url,
			reviews: []
		})
		const savedRestaurant = await newRestaurant.save()
		return res.status(201).json(savedRestaurant)
	}
	catch(error) {
		return res.status(400).json({ error: error.message })		
	}
})

restaurantsRouter.post('/:id/review', async (req, res) => {
	try {
		const restaurantId = req.params.id
		const restaurant = await Restaurant.findById(restaurantId)
		if (restaurant === null) return res.status(400).json({error: `No restaurant with id: \'${restaurantId}\' found.`})
		
		const newReview = new Review({
			comment: req.body.comment,
			stars: req.body.stars,
			restaurant: restaurantId,
			user: req.user.id,
		})
	
		const savedReviewId = await newReview.save()
		const savedReview = await Review.findById(savedReviewId).populate('user', { reviews: 0 })
		return res.status(200).json(savedReview)
	}
	catch(error){
		return res.status(400).json({ error: error.message })
	}
})

module.exports = restaurantsRouter