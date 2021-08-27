const mongoose = require('mongoose')

const reviewResponseSchema = new mongoose.Schema({
	response: {
		type: String,
		minlength: 3
	},
	review: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Review'
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
},
{ timestamps: true })

reviewResponseSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('ReviewResponse', reviewResponseSchema)