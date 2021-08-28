const ReviewResponse = require('../models/ReviewResponse')
const Review = require('../models/Review')

const GetReview = async (reviewId) => {	
	const existingReview = await Review.findById(reviewId)
	return existingReview
}

const CreateReview = async (review, restaurantId, user) => {
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

const CreateReviewResponse = async (userId, reviewId, response) => {	
	const newReviewResponse = new ReviewResponse({
		response,
        review: reviewId,
        user: userId
	})
	
	const savedReviewResponse = await newReviewResponse.save()
	return savedReviewResponse
}

const UpdateReview = async (reviewId, updatedReview) => {
	const existingReview = await GetReview(reviewId)
	if(updatedReview.comment) existingReview.comment = updatedReview.comment
	if(updatedReview.stars) existingReview.stars = updatedReview.stars
	if(updatedReview.restaurant) existingReview.restaurant = updatedReview.restaurant
	if(updatedReview.user) existingReview.user = updatedReview.user
	if(updatedReview.response) existingReview.response = updatedReview.response
	await existingReview.save()
	return existingReview
}

module.exports = {
	GetReview,
	CreateReviewResponse,
	UpdateReview,
	CreateReview
}