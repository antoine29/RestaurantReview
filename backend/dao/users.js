const User = require('../models/User')

const GetUser = async (id) => {
	const user = await User.findById(req.user.id)
    return user
}

module.exports = {
	GetUser
}