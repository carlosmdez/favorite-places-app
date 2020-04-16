import React, { useReducer, useEffect } from 'react'

import { validate } from '../../utils/validators'
import './Input.css'

const initialState = {
  value: '',
  isValid: false,
  isTouched: false,
}

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
  const [inputState, dispatch] = useReducer(inputReducer, initialState)

  const {
    element,
    errorText,
    id,
    label,
    onInput,
    placeholder,
    rows,
    type,
    validators,
  } = props

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
