const usersRouter = require('express').Router()
const { GetUser, GetUsers, DeleteUser, UpdateUser } = require('../dao/users')
const { GetUserRestaurants } = require('../dao/restaurants')

usersRouter.get('/', async (request, response) => {
	const user = request.user
	if(user.role !== 'admin') return response.status(403).json({error: 'Admin role restricted operation.'})
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

usersRouter.delete('/:id', async (request, response) => {
	try{
		const user = request.user
		if(user.role !== 'admin') return response.status(403).json({error: 'Admin role restricted operation.'})

		const userId = request.params.id
		const existingUser = await GetUser(userId)
		if(!existingUser) return response.status(404).json({ error: `User ${userId} not found.` })

		await DeleteUser(existingUser._id)
		return response.sendStatus(200)
	}
	catch(error){
		return response.status(400).json({ error: error.message })
	}
})

usersRouter.patch('/:id', async (request, response) => {
	try{
		const user = request.user
		if(user.role !== 'admin') return response.status(403).json({error: 'Admin role restricted operation.'})

		const userId = request.params.id
		const existingUser = await GetUser(userId)
		if(!existingUser) return response.status(404).json({ error: `User ${userId} not found.` })

		const updatedUser = request.body

		const savedUser = await UpdateUser(userId, updatedUser)
		return response.status(200).json(savedUser)
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