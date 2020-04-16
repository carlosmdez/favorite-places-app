import React, { useCallback, useReducer } from 'react'

import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/utils/validators'

import './NewPlace.css'

const initialState = {
  inputs: {
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
  },
  isValid: false,
}

const formReducer = (state, { type, payload }) => {
  switch (type) {
    case 'INPUT_CHANGE':
      let formIsValid = true
      for (const inputId in state.inputs) {
        if (inputId === payload.id) {
          formIsValid = formIsValid && payload.isValid
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [payload.id]: {
            value: payload.value,
            isValid: payload.isValid,
          },
        },
        isValid: formIsValid,
      }

    default:
      return state
  }
}

const NewPlace = () => {
  const [formState, dispatch] = useReducer(formReducer, initialState)

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({ type: 'INPUT_CHANGE', payload: { id, value, isValid } })
  }, [])

  const placeSubmitHandler = event => {
    event.preventDefault()
    console.log(formState.inputs)
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
      />
      <Input
        id='description'
        element='textarea'
        label='Title'
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText='Please enter a valid description (at least 5 characters).'
        onInput={inputHandler}
      />
      <Input
        id='address'
        element='input'
        type='text'
        label='Address'
        validators={[VALIDATOR_REQUIRE()]}
        errorText='Please enter a valid address.'
        onInput={inputHandler}
      />
      <Button type='submit' disabled={!formState.isValid}>
        Add Place
      </Button>
    </form>
  )
}

export default NewPlace
