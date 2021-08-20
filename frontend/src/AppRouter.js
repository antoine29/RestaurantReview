import React from 'react'
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom'
import SignInForm from './components/SignInForm'
import SignUpForm from './components/SignUpForm'
import Home from './components/Home/Home'

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
        <Route path='/restaurants'>
          <div>restaurants</div>
        </Route>
        <Route path='/'>
          <Home />
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