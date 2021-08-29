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

const GetUserByEmail = async (email) => {
	const user = await User.findOne({ email: email })
    return user
}

const CreateUser = async (user) => {
	const saltRounds = 5
	const passwordHash = await bcrypt.hash(user.password, saltRounds)
	
	const newUser = new User({
		name: user.name,
		username: user.username,
		email: user.email,
		name: user.name,
		passwordHash,
	})
	
	const savedUser = await newUser.save()
	return savedUser
}

const DeleteUser = async userId => {
	await User.deleteOne({ _id: userId})
}

const UpdateUser = async (userId, updatedUser) => {
	const existingUser = await GetUser(userId)
	if(updatedUser.name !== undefined) existingUser.name = updatedUser.name
	if(updatedUser.username !== undefined) existingUser.username = updatedUser.username
	if(updatedUser.email !== undefined) existingUser.email = updatedUser.email
	if(updatedUser.role !== undefined) existingUser.role = updatedUser.role
	await existingUser.save()

	return existingUser
}

module.exports = {
	GetUsers,
	GetUser,
	GetUserByEmail,
	CreateUser,
	DeleteUser,
	UpdateUser
}