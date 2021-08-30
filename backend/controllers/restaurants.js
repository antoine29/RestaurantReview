const restaurantsRouter = require('express').Router()
const { GetUser } = require('../dao/users')
const { CreateReviewResponse, GetReview, UpdateReview, CreateReview, DeleteReview } = require('../dao/reviews')
const {
	GetRestaurants,
	GetRestaurantsByStarAverage,
    GetRestaurant,
	CalculateRestaurantRating,
	GetRestaurantReviews,
    CreateRestaurant,
	UpdateRestaurant,
	DeleteRestaurant,
	DeleteRestaurantReview
} = require('../dao/restaurants')

restaurantsRouter.get('/', async (req, res) => {
	try {
		const starAverageFilter = req.query.star_average
		if(starAverageFilter){
			const restaurants = await GetRestaurantsByStarAverage(starAverageFilter)
			return res.json(restaurants)
		}
		else{
			const restaurants = await GetRestaurants()
			return res.json(restaurants)
		}
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

restaurantsRouter.delete('/:id', async (req, res) => {
	try {
		const restaurantId = req.params.id
		const restaurant = await GetRestaurant(restaurantId)
		if(!restaurant) return res.status(404).json({ error: `Restaurant ${restaurantId} not found.`})

		const existingUser = await GetUser(req.user.id)
		if(existingUser.role !== 'admin' && JSON.stringify(restaurant.owner._id) !== JSON.stringify(existingUser._id)) return res.status(401).json({ error: 'Not allowed.' })

		await DeleteRestaurant(restaurant._id)
		return res.sendStatus(200)
	}
	catch(error) {
		return res.status(400).json({ error: error.message })
	}
})

restaurantsRouter.patch('/:id', async (req, res) => {
	try{
		const restaurantId = req.params.id
		const restaurant = await GetRestaurant(restaurantId)
		if(!restaurant) return res.status(404).json({ error: `Restaurant ${restaurantId} not found.`})

		const existingUser = await GetUser(req.user.id)
		if(existingUser.role !== 'admin' && JSON.stringify(restaurant.owner._id) !== JSON.stringify(existingUser._id)) return res.status(401).json({ error: 'Not allowed.' })

		const updatedRestaurant = {
			name: req.body.name,
			address: req.body.address,
			url: req.body.url,
		}

		const savedRestaurant = await UpdateRestaurant(restaurantId, updatedRestaurant)
		return res.status(200).json(savedRestaurant)
	}
	catch(error){
		return res.status(400).json({ error: error.message })
	}
})

// ToDo: by adding reviews[] to rest model => maybe not util, delete then
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
		const user = await GetUser(req.user.id)
		if(user.role !== 'owner') return res.status(403).json({error: 'Owner role restricted operation.'})
		const newRestaurant = {
			name: req.body.name,
			address: req.body.address,
			url: req.body.url,
			owner: req.user.id
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
		const restaurant = await GetRestaurant(req.params.id)
		if (!restaurant) return res.status(404).json({ error: 'Restaurant not found' })
		const newReview = {
			comment: req.body.comment,
			stars: req.body.stars,
		}
		const savedReview = await CreateReview(newReview, restaurant._id, req.user)
		const updatedRestaurantRating = await CalculateRestaurantRating(restaurant._id)

		const existingRestaurantReviews = restaurant.reviews
		const updatedRestaurantReviews = existingRestaurantReviews && existingRestaurantReviews.length > 0 ? [ ...existingRestaurantReviews, savedReview._id ] : [ savedReview._id ]
		if(updatedRestaurantRating) await UpdateRestaurant(restaurant._id, { rating: updatedRestaurantRating, reviews: updatedRestaurantReviews })
		return res.status(200).json(savedReview)
	}
	catch(error){
		return res.status(400).json({ error: error.message })
	}
})

restaurantsRouter.delete('/:restaurantId/reviews/:reviewId', async (req, res) => {
	try {
		const existingUser = await GetUser(req.user.id)
		if(existingUser.role !== 'admin' && JSON.stringify(restaurant.owner._id) !== JSON.stringify(existingUser._id)) return res.status(401).json({ error: 'Not allowed.' })

		const review = await GetReview(req.params.reviewId)
		if (!review) return res.status(404).json({ error: 'Review not found' })

		const restaurant = await GetRestaurant(req.params.restaurantId)
		if (!restaurant) return res.status(404).json({ error: 'Restaurant not found' })

		let reviewOnRestaurant = false
		restaurant.reviews.forEach(review => {
			if(review._id === review._id) reviewOnRestaurant = true
		})
		if(!reviewOnRestaurant) return res.status(401).json({ error: 'Review not found in restaurant.'})

		await DeleteReview(review._id)
		await DeleteRestaurantReview(restaurant._id, review._id)

		let updatedRestaurantRating = await CalculateRestaurantRating(restaurant._id)
		if(updatedRestaurantRating===null){
			updatedRestaurantRating = {
				averageStars: 0,
				maxStar: 0,
				minStar: 0,
				totalReviews: 0
			}
		}

		await UpdateRestaurant(restaurant._id, { rating: updatedRestaurantRating })
		return res.sendStatus(200)
	}
	catch(error){
		return res.status(400).json({ error: error.message })
	}
})

restaurantsRouter.post('/:restaurantId/reviews/:reviewId/response', async (req, res) => {    
	try {
        const existingUser = await GetUser(req.user.id)
        if(!existingUser) return res.status(401).json({ error: 'User not found.'})
        if(existingUser.role !== 'owner') return res.status(401).json({ error: 'Invalid credentials.'})
        
        const existingRestaurant = await GetRestaurant(req.params.restaurantId)
        if(!existingRestaurant) return res.status(401).json({ error: 'Restaurant not found.'})
        if(JSON.stringify(existingRestaurant.owner.id) !== JSON.stringify(existingUser._id)) return res.status(401).json({ error: 'Invalid credentials.'})
        
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

module.exports = restaurantsRouter
