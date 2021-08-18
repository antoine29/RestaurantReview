const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
	comment: {
		type: String,
		minlength: 3
	},
	stars: {
    type: Number,
		min: 1,
		max: 5,
		required : true
	},
	restaurant: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Restaurant'
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
})

reviewSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Review', reviewSchema)