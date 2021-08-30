import axios from 'axios'
// ToDo: add .env file for this routes
const baseUrl = 'http://localhost:3001'

export const GetRestaurants = async () => {
  const response = await axios.get(`${baseUrl}/api/restaurants`)
  return response.data
}

export const GetUserRestaurants = async userId => {
  const response = await axios.get(`${baseUrl}/api/users/${userId}/restaurants`)
  return response.data
}

export const GetRestaurant = async (id) => {
  const response = await axios.get(`${baseUrl}/api/restaurants/${id}`)
  return response.data
}

export const DeleteRestaurant = async (id) => {
  const response = await axios.delete(`${baseUrl}/api/restaurants/${id}`)
  return response.data
}

export const UpdateRestaurant = async (restaurantId, updatedRestaurant) => {
  const response = await axios.patch(`${baseUrl}/api/restaurants/${restaurantId}`, updatedRestaurant)
  return response.data
}

export const GetRestaurantReviews = async (id) => {
  const response = await axios.get(`${baseUrl}/api/restaurants/${id}/reviews`)
  return response.data
}

export const CreateRestaurantReview = async (id, comment, stars) => {
  try{
    const response = await axios({
      method: 'post',
      url: `${baseUrl}/api/restaurants/${id}/reviews`,
      data: {comment, stars},
    })
    
    return response.data
  }
  catch(error){
    throw error.response.data;
  }
}

export const CreateRestaurantReviewResponse = async (restaurantId, reviewId, response) => {
  try{
    const apiResponse = await axios({
      method: 'post',
      url: `${baseUrl}/api/restaurants/${restaurantId}/reviews/${reviewId}/response`,
      data: response,
    })
    
    return apiResponse.data
  }
  catch(error){
    throw error.response.data;
  }
}

export const DeleteRestaurantReview = async (restaurantId, reviewId) => {
  try{
    const apiResponse = await axios({
      method: 'delete',
      url: `${baseUrl}/api/restaurants/${restaurantId}/reviews/${reviewId}`,
    })
  }
  catch(error){
    throw error.response.data;
  }
}

export const CreateRestaurant = async restaurant => {
  try{
    const apiResponse = await axios({
      method: 'post',
      url: `${baseUrl}/api/restaurants`,
      data: restaurant,
    })
    
    return apiResponse.data
  }
  catch(error){
    throw error.response.data;
  }
}