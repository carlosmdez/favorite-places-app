import React, { useReducer, useEffect } from 'react'

import { validate } from '../../utils/validators'
import './Input.css'

const inputReducer = (state, { type, payload }) => {
  switch (type) {
    case 'CHANGE':
      return {
        ...state,
        value: payload.val,
        isValid: validate(payload.val, payload.validators),
      }

    case 'TOUCH':
      return {
        ...state,
        isTouched: true,
      }

    default:
      return state
  }
}

const Input = props => {
  const {
    element,
    errorText,
    id,
    initialValid,
    label,
    onInput,
    placeholder,
    rows,
    type,
    validators,
    initialValue
  } = props

  const initialState = {
    value: initialValue || '',
    isValid: initialValid || false,
    isTouched: false,
  }
  
  const [inputState, dispatch] = useReducer(inputReducer, initialState)

  const { value, isValid, isTouched } = inputState
  useEffect(() => {
    onInput(id, value, isValid)
  }, [id, value, isValid, onInput])

  const changeHandler = event => {
    const inputValue = event.target.value
    dispatch({ type: 'CHANGE', payload: { val: inputValue, validators } })
  }

  const touchHandler = () => {
    dispatch({ type: 'TOUCH' })
  }

  const inputElement =
    element === 'input' ? (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={value}
      />
    ) : (
      <textarea
        id={id}
        rows={rows || 3}
        placeholder={placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={value}
      />
    )

  const invalidValue = !isValid && isTouched
  return (
    <div className={`form-control ${invalidValue && 'form-control--invalid'}`}>
      <label htmlFor={id}>{label}</label>
      {inputElement}
      {invalidValue && <p>{errorText}</p>}
    </div>
  )
}

export default Input
