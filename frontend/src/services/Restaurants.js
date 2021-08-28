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

export const GetRestaurantReviews = async (id) => {
  const response = await axios.get(`${baseUrl}/api/restaurants/${id}/reviews`)
  return response.data
}

export const CreateRestaurantReview = async (id, comment, stars, token) => {
  const response = await axios.post(`${baseUrl}/api/restaurants/${id}/reviews`, {comment, stars})
  return response.data
}
