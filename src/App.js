import React, { useState, useCallback } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import Users from './user/pages/Users'
import NewPlace from './places/pages/NewPlace'
import UpdatePlace from './places/pages/UpdatePlace'
import UserPlaces from './places/pages/UserPlaces'
import MainNavigation from './shared/components/Navigation/MainNavigation'
import Auth from './user/pages/Auth'
import { AuthContext } from './shared/context/authContext'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const login = useCallback(() => {
    setIsLoggedIn(true)
  }, [])

  const logout = useCallback(() => {
    setIsLoggedIn(false)
  }, [])

  let customRoutes

  if (isLoggedIn) {
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
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      <Router>
        <MainNavigation />
        <main>{customRoutes}</main>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
