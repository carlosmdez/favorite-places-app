import React, { useState, useContext } from 'react'

import Card from '../../shared/components/UIElements/Card'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import ImageUpload from '../../shared/components/FormElements/ImageUpload'
import useForm from '../../shared/hooks/useForm'
import useHttpClient from '../../shared/hooks/useHttpClient'
import { AuthContext } from '../../shared/context/authContext'
import { LOGIN_URL, SIGNUP_URL } from '../../shared/constants'
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/utils/validators'

import './Auth.css'

const initialInputs = {
  email: {
    value: '',
    isValid: false
  },
  password: {
    value: '',
    isValid: false
  }
}

const Auth = () => {
  const auth = useContext(AuthContext)
  const [isLoginMode, setIsLoginMode] = useState(true)
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [formState, inputHandler, setFormData] = useForm(initialInputs, false)

  const switchModeHandler = () => {
    const { email, password } = formState.inputs
    if (!isLoginMode) {
      const formWithoutName = { ...formState.inputs }
      delete formWithoutName.name
      delete formWithoutName.image
      setFormData(formWithoutName, email.isValid && password.isValid)
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false
          },
          image: {
            value: null,
            isValid: false
          }
        },
        false
      )
    }
    setIsLoginMode(prevMode => !prevMode)
  }

  const authSubmitHandler = event => {
    event.preventDefault()
    if (isLoginMode) {
      sendRequest(
        LOGIN_URL,
        'POST',
        { 'Content-Type': 'application/json' },
        JSON.stringify({
          email: formState.inputs.email.value,
          password: formState.inputs.password.value
        })
      )
        .then(res => {
          auth.login(res.userId, res.token)
        })
        .catch(err => console.log(err))
    } else {
      const formData = new FormData()
      formData.append('name', formState.inputs.name.value)
      formData.append('email', formState.inputs.email.value)
      formData.append('password', formState.inputs.password.value)
      formData.append('image', formState.inputs.image.value)
      sendRequest(SIGNUP_URL, 'POST', {}, formData)
        .then(res => {
          auth.login(res.userId, res.token)
        })
        .catch(err => console.log(err))
    }
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Card className='authentication'>
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>{isLoginMode ? 'Log In' : 'Sign Up'}</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <>
              <Input
                id='name'
                element='input'
                type='text'
                label='Name'
                validators={[VALIDATOR_REQUIRE()]}
                errorText='Please enter a name.'
                onInput={inputHandler}
              />
              <ImageUpload
                id='image'
                center
                onInput={inputHandler}
                errorText='Please provide an image.'
              />
            </>
          )}
          <Input
            id='email'
            element='input'
            type='email'
            label='Email'
            validators={[VALIDATOR_EMAIL()]}
            errorText='Please enter a valid email.'
            onInput={inputHandler}
          />
          <Input
            id='password'
            element='input'
            type='password'
            label='Password'
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText='Please enter a valid password, at least 6 characters.'
            onInput={inputHandler}
          />
          <Button type='submit' disabled={!formState.isValid}>
            {isLoginMode ? 'Log In' : 'Sign Up'}
          </Button>
        </form>
        {isLoginMode ? (
          <p className='auth__switch-link'>
            Don't have an account yet?{' '}
            <span onClick={switchModeHandler}>Sign Up</span>
          </p>
        ) : (
          <p className='auth__switch-link'>
            Already have an account?{' '}
            <span onClick={switchModeHandler}>Log In</span>
          </p>
        )}
      </Card>
    </>
  )
}

export default Auth
