const Restaurant = require('../models/Restaurant')
const Review = require('../models/Review')

const GetRestaurants = async () => {
	const restaurants = await Restaurant.find({})
    const ratedRestaurants = await Promise.all(
        restaurants.map(async (restaurant) => {
            const rate = await GetRestaurantRate(restaurant)
            restaurant._doc.rate = rate
            return restaurant
        })
    )
    
	return ratedRestaurants
}

const GetRestaurant = async (id) => {
	const restaurant = await Restaurant.findById(id)
	if(!restaurant) return null
    const rate = await GetRestaurantRate(restaurant)
	restaurant._doc.rate = rate
	return restaurant
}

const CreateRestaurant = async (restaurant) => {
	const newRestaurant = new Restaurant(restaurant)
	const savedRestaurant = await newRestaurant.save()
	return savedRestaurant
}

const CreateRestaurantReview = async (review, restaurant, user) => {
	const newReview = new Review({
        ...review,
        restaurant: restaurant.id,
        user: user.id
	})
	
	const savedReview = await newReview.save()
	return savedReview
}

// ToDo: make this 'agregated' field part of the model?
// i mean I think we can process it in one just query for each document
const GetRestaurantRate = async (restaurant) => {
    const starAverage =  await Review.aggregate([
		{ $match: { restaurant: restaurant._id }},
		{ $group: { _id: null, average: { $avg: '$stars' }}}
	]).exec()

	const rate = {
		starAverage: starAverage.length > 0 ? starAverage[0].average : 0,
		minRate: 0,
		maxRate: 0,
		totalReviews: 5
	}

    return rate
}

const GetRestaurantReviews = async (restaurantId) => {
    const reviews = await Review.find({ restaurant: restaurantId}).populate('user', { reviews: 0, role: 0})
	return reviews
}

module.exports = {
	GetRestaurants,
    GetRestaurant,
    CreateRestaurant,
    CreateRestaurantReview,
	GetRestaurantReviews
}