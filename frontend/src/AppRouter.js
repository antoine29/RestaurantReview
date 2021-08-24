import React from 'react'
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom'
import SignInForm from './components/SignForms/SignInForm'
import SignUpForm from './components/SignForms/SignUpForm'
import MainLayout from './components/Layout/MainLayout'
import Restaurant from './components/Restaurants/Restaurant'
import Restaurants from './components/Restaurants/Restaurants'

const AppRouter = () => {
  // ToDo:
  //   - default route for unsigned users should be /signin
  //   - default route for signed users should be /
  return(
    <Router>
      <Switch>
        <Route path='/signin'>
          <SignInForm />
        </Route>
        <Route path='/signup'>
          <SignUpForm />
        </Route>
        <Route path='/restaurants/:id'>
          <MainLayout component={Restaurant}/>
        </Route>
        <Route path='/restaurants'>
          <MainLayout component={Restaurants}/>
        </Route>
        <Route path='/'>
          <MainLayout component={Restaurants}/>
        </Route>
        {/* ToDo: enhance this unknow/default route handling */}
        <Route>
            <div>Unknow route</div>
        </Route>
      </Switch>
    </Router>
  )
}

export default AppRouter