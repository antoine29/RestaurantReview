const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/User')

usersRouter.get('/', async (request, response) => {
	const users = await User.find({}).populate('reviews', { user: 0 })
	response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response) => {
	const body = request.body
	if (body.password === undefined || body.password.length < 3)
		return response.status(400).json({ error: '`password` field must be defined and must be greather than 3 chars. length.' })

	const saltRounds = 5
	const passwordHash = await bcrypt.hash(body.password, saltRounds)

	const user = new User({
		username: body.username,
		email: body.email,
		name: body.name,
		passwordHash,
	})

	const savedUser = await user.save()
	response.json(savedUser)
})

module.exports = usersRouter