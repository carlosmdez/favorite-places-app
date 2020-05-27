import { createContext } from 'react'

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  login: () => {},
  logout: () => {}
})
AuthContext.displayName = 'AuthContext'
