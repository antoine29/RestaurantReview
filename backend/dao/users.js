const bcrypt = require('bcrypt')
const User = require('../models/User')

const GetUsers = async () => {
	const users = await User.find({}).populate('reviews', { user: 0 })
	return users
}

const GetUser = async (id) => {
	const user = await User.findById(id)
    return user
}

const CreateUser = async (user) => {
	const saltRounds = 5
	const passwordHash = await bcrypt.hash(user.password, saltRounds)
	
	const newUser = new User({
		username: user.username,
		email: user.email,
		name: user.name,
		passwordHash,
	})
	
	const savedUser = await newUser.save()
	return savedUser
}

module.exports = {
	GetUsers,
	GetUser,
	CreateUser
}