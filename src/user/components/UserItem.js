import React from 'react'
import { Link } from 'react-router-dom'

import Avatar from '../../shared/components/UIElements/Avatar'
import Card from '../../shared/components/UIElements/Card'
import { API_URL } from '../../shared/constants'

import './UserItem.css'

const UserItem = props => {
  const { id, name, image, placeCount } = props
  return (
    <li className='user-item'>
      <Card className='user-item__content'>
        <Link to={`/${id}/places`}>
          <div className='user-item__image'>
            <Avatar image={`${API_URL}/${image}`} alt={name} />
          </div>
          <div className='user-item__info'>
            <h2>{name}</h2>
            <h3>
              {placeCount} {placeCount === 1 ? 'place' : 'places'}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  )
}

export default UserItem
