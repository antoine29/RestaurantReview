const morgan = require('morgan')
const jwt = require('jsonwebtoken')
const logger = require('./logger')

morgan.token('body', req => JSON.stringify(req.body))
const requestLogger = morgan(':method :url :status :res[content-length] - :response-time ms :body')

const tokenHandler = (request, response, next) => {
	const authHeader = request.headers.authorization;
	if (authHeader){
		if (authHeader.toLowerCase().startsWith('bearer ')) {
			const token = authHeader.split(' ')[1];
			jwt.verify(token, process.env.SECRET, (err, user) => {
				if (err) {
					return response.status(403).json({error: err})
				}
				
				request.user = user
			})
		}
		else {
			return response.sendStatus(403)
		}
	}

	next()
}

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

module.exports = {
	requestLogger,
	unknownEndpoint,
	tokenHandler
}