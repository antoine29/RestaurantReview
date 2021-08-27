const Restaurant = require('../models/Restaurant')
const Review = require('../models/Review')

const GetRestaurants = async () => {
	const restaurants = await Restaurant.find({})
	return restaurants
}

const GetRestaurant = async (restaurantId) => {
	const restaurant = await Restaurant.findById(restaurantId)
	return restaurant
}

const CreateRestaurant = async (restaurant) => {
	const newRestaurant = new Restaurant(restaurant)
	const savedRestaurant = await newRestaurant.save()
	return savedRestaurant
}

const CreateRestaurantReview = async (review, restaurantId, user) => {
	
	const newReview = new Review({
        ...review,
        restaurant: restaurantId,
        user: user.id
	})
	
	const savedReview = await newReview.save()
	// ToDo: do we need this populate?
	const populatedReview = await Review.findById(savedReview.id).populate('user', {reviews: 0, role: 0})
	return populatedReview
}

const GetRestaurantReviews = async (restaurantId) => {
    const reviews = await Review.find({ restaurant: restaurantId}).populate('user', { reviews: 0, role: 0})
	return reviews
}

const GetRestaurantRating = async (restaurantId) => {
    const restaurantRating_result = await Review.aggregate([
		{ $match: { restaurant: restaurantId }},
		{ $group: {
			_id: null,
			averageStars: { $avg: '$stars' },
			maxStar: { $max: "$stars" },
			minStar: { $min: "$stars" },
			totalStars: { $count: {} }
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
		if (newRestaurant.rating.totalStars) existingRestaurant.rating.totalStars = newRestaurant.rating.totalStars
		if (newRestaurant.rating.minStar) existingRestaurant.rating.minStar = newRestaurant.rating.minStar
		if (newRestaurant.rating.maxStar) existingRestaurant.rating.maxStar = newRestaurant.rating.maxStar
	}
	await existingRestaurant.save()
	return existingRestaurant
}

module.exports = {
	GetRestaurants,
    GetRestaurant,
	GetRestaurantRating,
	GetRestaurantReviews,
    CreateRestaurant,
    CreateRestaurantReview,
	UpdateRestaurant
}