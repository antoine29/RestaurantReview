import axios from 'axios'
// ToDo: add .env file for this routes
const baseUrl = 'http://localhost:3001/auth/signin'

const signIn = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default signIn