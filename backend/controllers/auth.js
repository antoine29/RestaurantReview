const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const authRouter = require('express').Router()
const { GetUserByEmail, GetUser } = require('../dao/users')

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

authRouter.get('/token_user', async (request, response) => {
	if(!request.token) return response.status(403).json({ error: 'mising token.' })
	if(request.token.error) return response.status(403).json({ error: request.token.error })
	const existingUser = await GetUser(request.token.user.id)
	if(!existingUser) response.status(404).json({ error: "Token user not found."})
	return response.status(200).json(existingUser)
})

const checkUserPassword = async (password, hashedPassword) => {
	const isPasswordCorrect = await bcrypt.compare(password, hashedPassword)
	return isPasswordCorrect
}

module.exports = authRouter