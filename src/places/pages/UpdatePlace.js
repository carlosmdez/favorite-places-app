import React, { useEffect, useState, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import Card from '../../shared/components/UIElements/Card'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import useForm from '../../shared/hooks/useForm'
import useHttpClient from '../../shared/hooks/useHttpClient'
import { AuthContext } from '../../shared/context/authContext'
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/utils/validators'
import { GET_PLACE_URL, UPDATE_PLACE_URL } from '../../shared/constants'

import './PlaceForm.css'

const initialInputs = {
  title: {
    value: '',
    isValid: false
  },
  description: {
    value: '',
    isValid: false
  },
  address: {
    value: '',
    isValid: false
  }
}

const UpdatePlace = () => {
  const auth = useContext(AuthContext)
  const placeId = useParams().placeId
  const [formState, inputHandler, setFormData] = useForm(initialInputs, false)
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [loadedPlace, setLoadedPlace] = useState()
  const history = useHistory()

  useEffect(() => {
    sendRequest(`${GET_PLACE_URL}/${placeId}`)
      .then(placeData => {
        setLoadedPlace(placeData.place)
        setFormData(
          {
            title: { value: placeData.title, isValid: true },
            description: { value: placeData.description, isValid: true },
            address: { value: placeData.address, isValid: true }
          },
          true
        )
      })
      .catch(err => console.log(err))
  }, [sendRequest, placeId, setFormData])

  const placeSubmitHandler = event => {
    event.preventDefault()
    sendRequest(
      `${UPDATE_PLACE_URL}/${placeId}`,
      'PATCH',
      { 'Content-Type': 'application/json' },
      JSON.stringify({
        title: formState.inputs.title.value,
        description: formState.inputs.description.value,
        address: formState.inputs.address.value
      })
    )
      .then(res => {
        console.log('Place updated successfully')
        history.push(`/${auth.userId}/places`)
      })
      .catch(err => console.log(err))
  }

  if (isLoading) {
    return (
      <div className='center'>
        <LoadingSpinner />
      </div>
    )
  }

  if (!loadedPlace && !error) {
    return (
      <div className='center'>
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    )
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedPlace && (
        <form className='place-form' onSubmit={placeSubmitHandler}>
          <Input
            id='title'
            element='input'
            type='text'
            label='Title'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please enter a valid title.'
            onInput={inputHandler}
            initialValue={loadedPlace.title}
            initialValid={true}
          />
          <Input
            id='description'
            element='textarea'
            label='Description'
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText='Please enter a valid description (at least 5 characters).'
            onInput={inputHandler}
            initialValue={loadedPlace.description}
            initialValid={true}
          />
          <Input
            id='address'
            element='input'
            type='text'
            label='Address'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please enter a valid address.'
            onInput={inputHandler}
            initialValue={loadedPlace.address}
            initialValid={true}
          />
          <Button type='submit' disabled={!formState.isValid}>
            Update Place
          </Button>
        </form>
      )}
    </>
  )
}

export default UpdatePlace
