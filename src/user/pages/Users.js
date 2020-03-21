import React from 'react'
import UsersList from '../components/UsersList'

const Users = () => {
  const USERS = [
    {
      id: 'u1',
      name: 'Carlos Méndez',
      image: 'https://bit.ly/2vAyYsO',
      places: 3
    }
  ]

  return <UsersList items={USERS} />
}

export default Users
