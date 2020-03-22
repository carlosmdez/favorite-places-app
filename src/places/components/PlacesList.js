import React from 'react'

import Card from '../../shared/components/UIElements/Card'
import PlaceItem from './PlaceItem'
import './PlacesList.css'

const PlacesList = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className='place-list center'>
        <Card>
          <h2>No places found.</h2>
          <button>Share place</button>
        </Card>
      </div>
    )
  }

  return (
    <ul className='place-list'>
      {items.map(place => (
        <PlaceItem
          key={place.id}
          id={place.id}
          title={place.title}
          image={place.imageUrl}
          address={place.address}
          creatorId={place.creator}
          description={place.description}
          coordinates={place.location}
        />
      ))}
    </ul>
  )
}

export default PlacesList
