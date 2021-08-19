const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		minlength: 3,
		unique: true
	},
	email: {
		type: String,
		required: true,
		minlength: 3,
		unique: true
	},
	passwordHash: {
		type: String,
		required: true
	},
	reviews: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Review'
		}
	],
	role: {
		type: String,
		default: 'reviewer'
	}
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id
		delete returnedObject._id
		delete returnedObject.__v
		delete returnedObject.passwordHash
	}
})

module.exports = mongoose.model('User', userSchema)