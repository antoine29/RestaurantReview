const usersRouter = require('express').Router()
const { GetUser, GetUsers, CreateUser } = require('../dao/users')

usersRouter.get('/', async (request, response) => {
	// const users = await User.find({}).populate('reviews', { user: 0 })
	const users = await GetUsers()
	response.json(users.map(u => u.toJSON()))
})

usersRouter.get('/:id', async (request, response) => {
	const userId = request.params.id
	const user = await GetUser(userId)
	return user ? response.json(user) : response.sendStatus(402)
})

usersRouter.post('/', async (request, response) => {
	try {
		const body = request.body
		if (body.password === undefined || body.password.length < 3)
			return response.status(400).json({ error: '`password` field must be defined and must be greather than 3 chars. length.' })

		const newUser = {
			username: body.username,
			email: body.email,
			name: body.name,
			password: body.password
		}

		const savedUser = CreateUser(newUser)
		return response.json(savedUser)
	}
	catch(error) {
		return response.status(400).json({ error: error.message })
	}
})

module.exports = usersRouter