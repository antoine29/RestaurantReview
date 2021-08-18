const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)

const restaurantSchema = new mongoose.Schema({
	name: {
		type: String,
		minlength: 3,
		maxlength: 100,
		required: true,
	},
	address: {
		type: String,
		minlength: 3,
		maxlength: 100,
		required: true
	},
	url: {
		type: String,
		minlength: 3,
		maxlength: 100,
		required: true,
	},
	reviews: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Review'
		}
	]
})

restaurantSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Restaurant', restaurantSchema)