const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const authRouter = require('express').Router()
const User = require('../models/User')

authRouter.post('/login', async (request, response) => {
	const body = request.body
	const user = await User.findOne({ username: body.username })
	const passwordCorrect = user === null ?
		false : await bcrypt.compare(body.password, user.passwordHash)
	if (!(user && passwordCorrect))
		return response.status(401).json({
			error: 'invalid username or password'
		})

	const tokenizedUser = jwt.sign({
		username: user.username,
		id: user._id,
	}, process.env.SECRET, { expiresIn: '2h' })

	response
		.status(200)
		.send({
			id: user.id,
			username: user.username,
			token: tokenizedUser,
		})
})

module.exports = authRouter