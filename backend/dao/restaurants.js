const Restaurant = require('../models/Restaurant')
const Review = require('../models/Review')

const GetRestaurants = async () => {
	const restaurants = await Restaurant.find({}).populate('owner', { role: 0 })
	return restaurants
}

const GetRestaurant = async (restaurantId) => {
	const restaurant = await Restaurant.findById(restaurantId).populate('owner', { role: 0 })
	return restaurant
}

const CreateRestaurant = async (restaurant) => {
	const newRestaurant = new Restaurant(restaurant)
	const savedRestaurant = await newRestaurant.save()
	const savedPopulatedRestaurant = await GetRestaurant(savedRestaurant._id)
	return savedPopulatedRestaurant
}

const GetRestaurantReviews = async (restaurantId) => {
    const reviews = await Review
		.find({ restaurant: restaurantId})
		.populate('user', { reviews: 0, role: 0})
		.populate('response', { user: 0 })
	return reviews
}

const CalculateRestaurantRating = async (restaurantId) => {
    const restaurantRating_result = await Review.aggregate([
		{ $match: { restaurant: restaurantId }},
		{ $group: {
			_id: null,
			averageStars: { $avg: '$stars' },
			maxStar: { $max: "$stars" },
			minStar: { $min: "$stars" },
			totalReviews: { $count: {} }
		}}
	]).exec()

	const restaurantRating = restaurantRating_result.length > 0 ? restaurantRating_result[0] : null
	console.log(`updated rating for restaurant ${restaurantId}:`, restaurantRating)
	return restaurantRating
}

const UpdateRestaurant = async (restaurantId, newRestaurant) => {
	const existingRestaurant = await GetRestaurant(restaurantId)
	if (newRestaurant.name) existingRestaurant.name = newRestaurant.name 
	if (newRestaurant.address) existingRestaurant.address = newRestaurant.address
	if (newRestaurant.url) existingRestaurant.url = newRestaurant.url
	if(newRestaurant.rating){
		if (newRestaurant.rating.averageStars) existingRestaurant.rating.averageStars = newRestaurant.rating.averageStars
		if (newRestaurant.rating.totalReviews) existingRestaurant.rating.totalReviews = newRestaurant.rating.totalReviews
		if (newRestaurant.rating.minStar) existingRestaurant.rating.minStar = newRestaurant.rating.minStar
		if (newRestaurant.rating.maxStar) existingRestaurant.rating.maxStar = newRestaurant.rating.maxStar
	}
	await existingRestaurant.save()
	return existingRestaurant
}

const GetUserRestaurants = async userId => {
	const restaurants = await Restaurant.find({owner: userId})
	return restaurants
}

const DeleteRestaurant = async restaurantId => {
	await Restaurant.deleteOne({ _id: restaurantId })
}

module.exports = {
	GetRestaurants,
    GetRestaurant,
	CalculateRestaurantRating,
	GetRestaurantReviews,
    CreateRestaurant,
	UpdateRestaurant,
	GetUserRestaurants,
	DeleteRestaurant
}