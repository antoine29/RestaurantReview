const restaurantsRouter = require('express').Router()
const { GetUser } = require('../dao/users')
const {
	GetRestaurants,
    GetRestaurant,
    CreateRestaurant,
    CreateRestaurantReview,
	GetRestaurantReviews
} = require('../dao/restaurants')

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
		if(!restaurant) res.status(404).json({ error: `Restaurant ${restaurantId} not found.`})
		return restaurant ? res.json(restaurant) : res.sendStatus(402)
	}
	catch(error) {
		return res.status(400).json({ error: error.message })
	}
})

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
		if (!req.user) return res.sendStatus(401)
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

restaurantsRouter.post('/:id/review', async (req, res) => {
	try {
		if (!req.user) return res.sendStatus(401)
		const restaurantId = req.params.id
		const restaurant = await GetRestaurant(restaurantId)
		if (restaurant === null) return res.status(400).json({error: `No restaurant with id: \'${restaurantId}\' found.`})
		
		const newReview = {
			comment: req.body.comment,
			stars: req.body.stars,
		}
		const savedReview = await CreateRestaurantReview(newReview, restaurant, req.user)
		return res.status(200).json(savedReview)
	}
	catch(error){
		return res.status(400).json({ error: error.message })
	}
})

module.exports = restaurantsRouter