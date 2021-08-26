import React from 'react'
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom'
import SignInForm from './components/SignForms/SignInForm'
import SignUpForm from './components/SignForms/SignUpForm'
import MainLayout from './components/Layout/MainLayout'
import Restaurant from './components/Restaurants/Restaurant'
import Restaurants from './components/Restaurants/Restaurants'
import ProtectedRoute from './ProtectedRoute'
import Users from './components/Users'
import ErrorPage from './components/ErrorPage'

const UsersView = () => <MainLayout component={Users}/>
const RestaurantView = () => <MainLayout component={Restaurant}/>
const RestaurantsView = () => <MainLayout component={Restaurants}/>

const AppRouter = () => {
  return(
    <Router>
      <Switch>
        <Route path='/signin'>
          <SignInForm />
        </Route>
        <Route path='/signup'>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' Component={ UsersView }/>
        <ProtectedRoute path='/restaurants/:id' Component={ RestaurantView }/>
        <ProtectedRoute path='/restaurants' Component={ RestaurantsView }/>
        <Route path='/error'>
          <MainLayout component={ErrorPage}/>
        </Route>
        {/* ToDo: enhance this unknow/default route handling */}
        <Route exact path='/'>
          <Redirect to='/restaurants' />
        </Route>
        <Route path=''>
          <Redirect to='/error' />
        </Route>
      </Switch>
    </Router>
  )
}

export default AppRouter