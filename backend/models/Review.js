const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
	comment: {
		type: String,
		minlength: 3
	},
	stars: {
    	type: Number,
		min: 0,
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
	},
	response: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'ReviewResponse'
	}
},
{ timestamps: true })

reviewSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Review', reviewSchema)