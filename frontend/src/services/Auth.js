import axios from 'axios'
// ToDo: add .env file for this routes
const baseUrl = 'http://localhost:3001'

export const SignIn = async credentials => {
  const response = await axios.post(`${baseUrl}/auth/signin`, credentials)
  return response.data
}

export const SignUp = async user => {
  const response = await axios.post(`${baseUrl}/api/users`, user)
  return response.data
}
