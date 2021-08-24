import axios from 'axios'
// ToDo: add .env file for this routes
const baseUrl = 'http://localhost:3001'
const localUserKey = 'RRUser'

export const SignIn = async credentials => {
  const response = await axios.post(`${baseUrl}/auth/signin`, credentials)
  return response.data
}

// ToDo: send the actual error messages in case of errors, currently an exception is throwed
export const SignUp = async user => {
  const response = await axios.post(`${baseUrl}/api/users`, user)
  return response.data
}

export const SignOut = (history) => {
  window.localStorage.clear()
  history.push('/signin')
}

export const GetStoredUser = () => {
  const storedUserToken = window.localStorage.getItem(localUserKey)
  return JSON.parse(storedUserToken)
}

export const SetStoredUser = (user) => {
  window.localStorage.setItem(localUserKey, JSON.stringify(user))
  return GetStoredUser()
}
