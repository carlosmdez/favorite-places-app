import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import { AuthContext } from '../../context/authContext'

import './NavLinks.css'

const NavLinks = () => {
  const auth = useContext(AuthContext)
  return (
    <ul className='nav-links'>
      <li>
        <NavLink to='/' exact>
          All Users
        </NavLink>
      </li>
      {auth.isLoggedIn ? (
        <>
          <li>
            <NavLink to={`/${auth.userId}/places`}>My Places</NavLink>
          </li>
          <li>
            <NavLink to='/places/new'>Add Place</NavLink>
          </li>
          <button onClick={auth.logout}>Logout</button>
        </>
      ) : (
        <li>
          <NavLink to='/auth'>Authenticate</NavLink>
        </li>
      )}
    </ul>
  )
}

export default NavLinks
