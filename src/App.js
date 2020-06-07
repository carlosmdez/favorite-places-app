import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'

import Auth from './user/pages/Auth'
import Users from './user/pages/Users'
import NewPlace from './places/pages/NewPlace'
import UserPlaces from './places/pages/UserPlaces'
import UpdatePlace from './places/pages/UpdatePlace'
import MainNavigation from './shared/components/Navigation/MainNavigation'
import { AuthContext } from './shared/context/authContext'
import useAuth from './shared/hooks/useAuth'

const App = () => {
  const { token, login, logout, userId } = useAuth()

  let customRoutes

  if (token) {
    customRoutes = (
      <Switch>
        <Route path='/' exact component={Users} />
        <Route path='/:userId/places' exact component={UserPlaces} />
        <Route path='/places/new' exact component={NewPlace} />
        <Route path='/places/:placeId' exact component={UpdatePlace} />
        <Redirect to='/' />
      </Switch>
    )
  } else {
    customRoutes = (
      <Switch>
        <Route path='/' exact component={Users} />
        <Route path='/:userId/places' exact component={UserPlaces} />
        <Route path='/auth' exact component={Auth} />
        <Redirect to='/auth' />
      </Switch>
    )
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, token, userId, login, logout }}
    >
      <Router>
        <MainNavigation />
        <main>{customRoutes}</main>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
