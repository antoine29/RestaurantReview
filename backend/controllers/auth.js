const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const authRouter = require('express').Router()
const { GetUserByEmail, CreateUser } = require('../dao/users')

authRouter.post('/signin', async (request, response) => {
	const user = await GetUserByEmail(request.body.email)
	if(!user) return response.status(401).json({ error: 'invalid username or password' })

	const validCredentials = await checkUserPassword(request.body.password, user.passwordHash)
	if(!validCredentials) return response.status(401).json({ error: 'invalid username or password' })

	const tokenizedUser = jwt.sign({
		id: user._id,
		name: user.name,
		username: user.username,
		role: user.role
	}, process.env.SECRET, { expiresIn: '2h' })

	return response
		.status(200)
		.send({
			token: tokenizedUser,
		})
})

authRouter.post('/signup', async (request, response) => {
	try {
		const body = request.body
		if (body.password === undefined || body.password.length < 3)
			return response.status(400).json({ error: '`password` field must be defined and must be greather than 3 chars. length.' })

		const newUser = {
			name: body.name,
			username: body.username,
			email: body.email,
			name: body.name,
			password: body.password
		}

		const savedUser = await CreateUser(newUser)
		return response.json(savedUser)
	}
	catch(error) {
		return response.status(400).json({ error: error.message })
	}
})

const checkUserPassword = async (password, hashedPassword) => {
	const isPasswordCorrect = await bcrypt.compare(password, hashedPassword)
	return isPasswordCorrect
}

module.exports = authRouter