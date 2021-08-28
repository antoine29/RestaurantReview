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
import OwnerRestaurants from './components/Restaurants/OwnerRestaurants'

const UsersView = (props) => <MainLayout component={Users} user={props.user}/>
const RestaurantView = (props) => <MainLayout component={Restaurant} user={props.user}/>
const RestaurantsView = (props) => <MainLayout component={Restaurants} user={props.user}/>
export const ErrorPageView = (props) => <MainLayout component={ErrorPage} user={props.user}/>
const UserRestaurantsView = (props) => <MainLayout component={OwnerRestaurants} user={props.user}/>

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
        <ProtectedRoute path='/restaurants/:id' Component={ RestaurantView }/>
        <ProtectedRoute path='/restaurants' Component={ RestaurantsView }/>
        <ProtectedRoute exact path='/users' Component={ UsersView }/>
        <ProtectedRoute path='/owner/:id/restaurants' Component={ UserRestaurantsView }/>
        <Route path='/error'>
          <MainLayout component={ErrorPageView}/>
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