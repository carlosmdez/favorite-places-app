import React from 'react'
import { useParams } from 'react-router-dom'

import PlacesList from '../components/PlacesList'

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'An amazing place to eat.',
    imageUrl: 'https://bit.ly/396w3Wx',
    address: 'West 34th Street, New York, NY, USA',
    location: {
      lat: 40.7491775,
      lng: -73.9928418
    },
    creator: 'u1'
  },
  {
    id: 'p2',
    title: 'Empire State Building',
    description: 'An amazing place to eat.',
    imageUrl: 'https://bit.ly/396w3Wx',
    address: 'West 34th Street, New York, NY, USA',
    location: {
      lat: 40.7491775,
      lng: -73.9928418
    },
    creator: 'u2'
  }
]

const UserPlaces = () => {
  const userId = useParams().userId
  const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId)
  
  return <PlacesList items={loadedPlaces} />
}

export default UserPlaces
