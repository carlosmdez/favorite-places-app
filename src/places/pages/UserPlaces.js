import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import PlacesList from '../components/PlacesList'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'

import useHttpClient from '../../shared/hooks/useHttpClient'
import { GET_PLACES_URL } from '../../shared/constants'

const UserPlaces = () => {
  const userId = useParams().userId
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [places, setPlaces] = useState([])

  useEffect(() => {
    sendRequest(`${GET_PLACES_URL}/${userId}`)
      .then(data => {
        setPlaces(data.places)
      })
      .catch(err => console.log(err))
  }, [sendRequest, userId])

  const placeDeletedHandler = deletedPlaceId => {
    setPlaces(prevPlaces =>
      prevPlaces.filter(place => place.id !== deletedPlaceId)
    )
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className='center'>
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && places && (
        <PlacesList items={places} onDeletePlace={placeDeletedHandler} />
      )}
    </>
  )
}

export default UserPlaces
