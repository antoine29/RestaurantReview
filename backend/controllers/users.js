const usersRouter = require('express').Router()
const { GetUser, GetUsers } = require('../dao/users')
const { GetUserRestaurants } = require('../dao/restaurants')

usersRouter.get('/', async (request, response) => {
	// ToDo: only an admin user can get this
	const users = await GetUsers()
	response.json(users.map(u => u.toJSON()))
})

usersRouter.get('/:id', async (request, response) => {
	try{
		const userId = request.params.id
		const user = await GetUser(userId)
		return user ? response.json(user) : response.status(404).json({ error: `User ${userId} not found.` })
	}
	catch(error){
		return response.status(400).json({ error: error.message })
	}
})

usersRouter.get('/:id/restaurants', async (request, response) => {
	try{
		const userId = request.params.id
		const user = await GetUser(userId)
		if(!user) return response.status(404).json({ error: "User not found." })
		const restaurants = await GetUserRestaurants(user._id)
		return response.json(restaurants)
	}
	catch(error){
		return response.status(400).json({ error: error.message })
	}
})


module.exports = usersRouter