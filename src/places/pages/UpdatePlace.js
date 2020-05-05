import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import Card from '../../shared/components/UIElements/Card'
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/utils/validators'

import './PlaceForm.css'
import useForm from '../../shared/hooks/useForm'

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'An amazing place to eat.',
    imageUrl: 'https://bit.ly/396w3Wx',
    address: 'West 34th Street, New York, NY, USA',
    location: {
      lat: 40.748441,
      lng: -73.9856673,
    },
    creator: 'u1',
  },
  {
    id: 'p2',
    title: 'Empire State Building',
    description: 'An amazing place to eat.',
    imageUrl: 'https://bit.ly/396w3Wx',
    address: 'West 34th Street, New York, NY, USA',
    location: {
      lat: 40.7491775,
      lng: -73.9928418,
    },
    creator: 'u2',
  },
]

const initialInputs = {
  title: {
    value: '',
    isValid: false,
  },
  description: {
    value: '',
    isValid: false,
  },
  address: {
    value: '',
    isValid: false,
  },
}

const UpdatePlace = () => {
  const placeId = useParams().placeId
  const [formState, inputHandler, setFormData] = useForm(initialInputs, false)
  const [isLoading, setIsLoading] = useState(true)

  const placeData = DUMMY_PLACES.find(place => placeId === place.id)
  useEffect(() => {
    if (placeData) {
      setFormData(
        {
          title: {
            value: placeData.title,
            isValid: true,
          },
          description: {
            value: placeData.description,
            isValid: true,
          },
          address: {
            value: placeData.address,
            isValid: true,
          },
        },
        true
      )
    }
    setIsLoading(false)
  }, [setFormData, placeData])

  const placeSubmitHandler = event => {
    event.preventDefault()
    console.log(formState.inputs)
  }

  if (!placeData) {
    return (
      <div className='center'>
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className='center'>
        <Card>
          <h2>Loading...</h2>
        </Card>
      </div>
    )
  }

  return (
    <form className='place-form' onSubmit={placeSubmitHandler}>
      <Input
        id='title'
        element='input'
        type='text'
        label='Title'
        validators={[VALIDATOR_REQUIRE()]}
        errorText='Please enter a valid title.'
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id='description'
        element='textarea'
        label='Description'
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText='Please enter a valid description (at least 5 characters).'
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />
      <Input
        id='address'
        element='input'
        type='text'
        label='Address'
        validators={[VALIDATOR_REQUIRE()]}
        errorText='Please enter a valid address.'
        onInput={inputHandler}
        initialValue={formState.inputs.address.value}
        initialValid={formState.inputs.address.isValid}
      />
      <Button type='submit' disabled={!formState.isValid}>
        Update Place
      </Button>
    </form>
  )
}

export default UpdatePlace
