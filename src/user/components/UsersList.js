import React from 'react'

import './UsersList.css'
import UserItem from './UserItem'

const UsersList = props => {
  const { items } = props
  if (items.length === 0) {
    return (
      <div className='center'>
        <h2>No users found.</h2>
      </div>
    )
  }
  return (
    <ul className="users-list">
      {items.map(user => {
        return (
          <UserItem
            key={user.id}
            name={user.name}
            image={user.image}
            placeCount={user.places}
          />
        )
      })}
    </ul>
  )
}

export default UsersList
