const tokenValidatorRouter = require('express').Router()
const { GetUser } = require('../dao/users')

tokenValidatorRouter.get('/', async (request, response) => {
	const existingUser = await GetUser(request.user.id)
	if(!existingUser) response.status(404).json({ error: "Token user not found."})
	return response.status(200).json(existingUser)
})

module.exports = tokenValidatorRouter