const restaurantsRouter = require('express').Router()
const { GetUser } = require('../dao/users')
const {
	GetRestaurants,
    GetRestaurant,
	CalculateRestaurantRating,
	GetRestaurantReviews,
    CreateRestaurant,
    CreateRestaurantReview,
	UpdateRestaurant
} = require('../dao/restaurants')
const { CreateReviewResponse, GetReview, UpdateReview } = require('../dao/reviews')

restaurantsRouter.get('/', async (req, res) => {
	try {
		const restaurants = await GetRestaurants()
		return res.json(restaurants)
	}
	catch(error) {
		return res.status(400).json({ error: error.message })
	}
})

restaurantsRouter.get('/:id', async (req, res) => {
	try {
		const restaurantId = req.params.id
		const restaurant = await GetRestaurant(restaurantId)
		if(!restaurant) return res.status(404).json({ error: `Restaurant ${restaurantId} not found.`})
		return res.status(200).json(restaurant)
	}
	catch(error) {
		return res.status(400).json({ error: error.message })
	}
})

// ToDo: maybe not util, delete
restaurantsRouter.get('/:id/reviews', async (req, res) => {
	try {
		const restaurantId = req.params.id
		const reviews = await GetRestaurantReviews(restaurantId)
		return res.status(200).json(reviews)
	}
	catch(error) {
		return res.status(400).json({ error: error.message })
	}
})

restaurantsRouter.post('/', async (req, res) => {
	try {
		if (req.token.error) return res.status(401).json({ error: req.token.error})
		const user = await GetUser(req.token.user.id)
		if(user.role !== 'owner') return res.status(403).json({error: 'Owner role restricted operation.'})
		const newRestaurant = {
			name: req.body.name,
			address: req.body.address,
			url: req.body.url,
			owner: req.token.user.id
		}
		const savedRestaurant = await CreateRestaurant(newRestaurant)
		return res.status(201).json(savedRestaurant)
	}
	catch(error) {
		return res.status(400).json(error)
	}
})

restaurantsRouter.post('/:id/reviews', async (req, res) => {
	try {
		if (req.token.error) return res.status(401).json({ error: req.token.error})
		const restaurant = await GetRestaurant(req.params.id)
		if (!restaurant) return res.status(404).json({ error: error.message })
		const newReview = {
			comment: req.body.comment,
			stars: req.body.stars,
		}
		const savedReview = await CreateRestaurantReview(newReview, restaurant._id, req.token.user)
		const updatedRestaurantRating = await CalculateRestaurantRating(restaurant._id)
		if(updatedRestaurantRating) await UpdateRestaurant(restaurant._id, {rating: updatedRestaurantRating})
		return res.status(200).json(savedReview)
	}
	catch(error){
		return res.status(400).json({ error: error.message })
	}
})

restaurantsRouter.post('/:restaurantId/reviews/:reviewId/response', async (req, res) => {    
	try {
        if (!req.token || !req.token.user) return res.status(401).json({ error: 'Missing token.'})
		if (req.token.error) return res.status(401).json({ error: req.token.error})
        
        const existingUser = await GetUser(req.token.user.id)
        if(!existingUser) return res.status(401).json({ error: 'User not found.'})
        if(existingUser.role !== 'owner') {
			console.log(0)
			return res.status(401).json({ error: 'Invalid credentials.'})
		}
        
        const existingRestaurant = await GetRestaurant(req.params.restaurantId)
        if(!existingRestaurant) return res.status(401).json({ error: 'Restaurant not found.'})
        if(JSON.stringify(existingRestaurant.owner) !== JSON.stringify(existingUser._id)) return res.status(401).json({ error: 'Invalid credentials.'})
        
        const existingReview = await GetReview(req.params.reviewId)
		if(!existingReview) return res.status(401).json({ error: 'Review not found.'})
		if(JSON.stringify(existingReview.restaurant) !== JSON.stringify(existingRestaurant._id)) return res.status(401).json({ error: 'Invalid paramters.'})

		const savedReviewResponse = await CreateReviewResponse(existingUser._id, existingReview._id, req.body.response)
		const updateReview = await UpdateReview(existingReview._id, { response: savedReviewResponse._id })
		return res.status(200).json(savedReviewResponse)
	}
	catch(error){
		return res.status(400).json({ error: error.message })
	}
})

restaurantsRouter.get('/:id/rating', async (req, res) => {
	try {
		if (req.token.error) return res.status(401).json({ error: req.token.error})
		const restaurant = await GetRestaurant(req.params.id)
		if (!restaurant) return res.status(404).json({ error: error.message })
		const restaurantRating = await CalculateRestaurantRating(restaurant._id)
		return res.status(200).json(restaurantRating)
	}
	catch(error){
		return res.status(400).json({ error: error.message })
	}
})

module.exports = restaurantsRouter
