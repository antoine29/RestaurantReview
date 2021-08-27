const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)

const RestaurantRating = new mongoose.Schema({
	averageStars: {
		type: Number,
		default: 0
	},
	totalReviews: {
		type: Number,
		default: 0
	},
	minStar: {
		type: Number,
		min: 0,
		max: 5,
		default: 0
	},
	maxStar: {
		type: Number,
		min: 0,
		max: 5,
		default: 0
	}
})

RestaurantRating.set('toJSON', {
	transform: (document, returnedObject) => {
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = RestaurantRating
