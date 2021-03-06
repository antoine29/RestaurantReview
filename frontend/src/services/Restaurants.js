import axios from 'axios'

const getBackednApi = () => {
  const baseUrl = process.env.NODE_ENV === 'production' &&
  process.env.REACT_APP_BACKEND_API ? process.env.REACT_APP_BACKEND_API : 'http://localhost:3001'
  return baseUrl
}

const baseUrl = getBackednApi()

export const GetRestaurants = async (starAverage) => {
  const request = starAverage > -1 ? `${baseUrl}/api/restaurants/?star_average=${starAverage}` : `${baseUrl}/api/restaurants/`
  const response = await axios.get(request)
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