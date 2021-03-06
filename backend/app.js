const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const restaurantRouter = require('./controllers/restaurants')
const usersRouter = require('./controllers/users')
const authRouter = require('./controllers/auth')
const tokenValidator = require('./controllers/tokenValidator')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const Restaurants = require('./models/Restaurant')

logger.info('connecting to', config.MONGODB_URI)

mongoose
    .connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => logger.info('connected to MongoDB'))
    .catch(error => logger.error('error connecting to MongoDB:', error.message))

app.use(cors())
//app.use(express.static('../frontend/build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.get('/health', async (req, res) => res.send(`<p>Backend is working!</p>`))
app.use('/auth', authRouter)

app.use(middleware.tokenHandler)
app.get('/api/info', async (req, res) => {
	const restaurantsCount = await Restaurants.countDocuments({})
	return res.send(`<p>${restaurantsCount} restaurant entries.</p><p>${new Date()}</p>`)
})
app.use('/api/token', tokenValidator)
app.use('/api/users', usersRouter)
app.use('/api/restaurants', restaurantRouter)
app.use(middleware.unknownEndpoint)

module.exports = app