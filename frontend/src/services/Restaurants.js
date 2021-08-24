import axios from 'axios'
// ToDo: add .env file for this routes
const baseUrl = 'http://localhost:3001'

export const GetRestaurants = async () => {
  const response = await axios.get(`${baseUrl}/api/restaurants`)
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
