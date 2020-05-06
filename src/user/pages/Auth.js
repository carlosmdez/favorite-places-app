import React, { useState, useContext } from 'react'

import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import Card from '../../shared/components/UIElements/Card'
import useForm from '../../shared/hooks/useForm'
import { AuthContext } from '../../shared/context/authContext'
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE
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
  const [formState, inputHandler, setFormData] = useForm(initialInputs, false)

  const switchModeHandler = () => {
    const { email, password } = formState.inputs
    if (!isLoginMode) {
      const formWithoutName = { ...formState.inputs }
      delete formWithoutName.name
      setFormData(formWithoutName, email.isValid && password.isValid)
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
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
    console.log(formState.inputs)
    auth.login()
  }

  return (
    <Card className='authentication'>
      <h2>{isLoginMode ? 'Log In' : 'Sign Up'}</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
        {!isLoginMode && (
          <Input
            id='name'
            element='input'
            type='text'
            label='Name'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please enter a name.'
            onInput={inputHandler}
          />
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
          validators={[VALIDATOR_REQUIRE()]}
          errorText='Please enter a valid password.'
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
  )
}

export default Auth
