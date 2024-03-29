import React from 'react'

import Card from '../../shared/components/UIElements/Card'
import Button from '../../shared/components/FormElements/Button'
import PlaceItem from './PlaceItem'

import './PlacesList.css'

const PlacesList = ({ items, onDeletePlace }) => {
  if (items.length === 0) {
    return (
      <div className='place-list center'>
        <Card>
          <h2>No places found.</h2>
          <Button to='/places/new'>Share place</Button>
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
          image={place.image}
          address={place.address}
          creatorId={place.creator}
          description={place.description}
          coordinates={place.location}
          onDelete={onDeletePlace}
        />
      ))}
    </ul>
  )
}

export default PlacesList
