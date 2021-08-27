import React, { useEffect, useState } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { GetUserByStoredUser, DeleteStoredUser } from './services/Users'
import Roles from './Roles'

const checkUserAccess = (user, targetPath) => {
  const allowedRoutes = Roles[user.role]
  return allowedRoutes.includes(targetPath)
}

const ProtectedRoute = ({ Component, ...props }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getStoredUserCall = async () => {
      const _user = await GetUserByStoredUser()
      setUser(_user)
      setLoading(false)
    }

    getStoredUserCall()
  }, [])

  if(loading){
    // ToDo: toasts to log this errors?
    console.log('waiting local user access validation')
    return (<div>waiting </div>)
  }

  if(user === null){
    console.log('error validating local user, please sign in again')
    DeleteStoredUser()
    return (
      <Redirect to='/signin' />
    )
  }

  if(!checkUserAccess(user, props.path)){
    console.log(`Not allowed to go to ${props.path}`)
    return (
      <Redirect to='/error' />
    )
  }

  return (
    <Route
      {...props}
      render={routeProps => <Component {...routeProps} />}
    />
  )
}

export default ProtectedRoute