import axios from 'axios'

const getBackednApi = () => {
  console.log('env:', process.env.NODE_ENV)
  console.log('env condition:', process.env.NODE_ENV === 'production')
  console.log('env var:', process.env.REACT_APP_BACKEND_API)
  const baseUrl = process.env.NODE_ENV === 'production' &&
  process.env.REACT_APP_BACKEND_API ? process.env.REACT_APP_BACKEND_API : 'http://localhost:3001'
  console.log('base url ', baseUrl)
  return baseUrl
}

const baseUrl = getBackednApi()
const localUserKey = 'RRUser'

export const SignIn = async credentials => {
  const response = await axios.post(`${baseUrl}/auth/signin`, credentials)
  return response.data
}

// ToDo: send the actual error messages in case of errors, currently an exception is throwed
export const SignUp = async user => {
  const response = await axios.post(`${baseUrl}/auth/signup`, user)
  return response.data
}

export const GetUser = async user => {
  const response = await axios.get(`${baseUrl}/api/users/${user.id}`)
  return response.data
}

export const GetUserByStoredUser = async () => {
  const storedToken = GetStoredUser()
  if (!storedToken) return null

  const response = await axios.get(`${baseUrl}/api/token`, {
    headers: {
      Authorization: 'bearer ' + storedToken.token
    }
  })
  .catch(error => null)

  if(response === null) return null
  return response.data
}

export const DeleteStoredUser = () => {
  window.localStorage.clear()
}

export const GetStoredUser = () => {
  const storedUserToken = window.localStorage.getItem(localUserKey)
  return JSON.parse(storedUserToken)
}

export const SetStoredUser = (user) => {
  window.localStorage.setItem(localUserKey, JSON.stringify(user))
  return GetStoredUser()
}

export const GetUsers = async () => {
  const response = await axios.get(`${baseUrl}/api/users`)
  return response.data
}

export const DeleteUser = async userId => {
  const response = await axios.delete(`${baseUrl}/api/users/${userId}`)
}

export const UpdateUser = async (userId, updatedUser) => {
  const response = await axios.patch(`${baseUrl}/api/users/${userId}`, updatedUser)
  return response.data
}
