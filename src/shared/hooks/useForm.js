import { useCallback, useReducer } from 'react'

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
    case 'SET_DATA':
      return {
        ...state,
        inputs: payload.inputs,
        isValid: payload.isValid,
      }
    default:
      return state
  }
}

const useForm = (initialInputs, initialFormValidity) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity,
  })

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({ type: 'INPUT_CHANGE', payload: { id, value, isValid } })
  }, [])

  const setFormData = useCallback((inputData, formValidity) => {
    dispatch({
      type: 'SET_DATA',
      payload: {
        inputs: inputData,
        isValid: formValidity,
      },
    })
  }, [])

  return [formState, inputHandler, setFormData]
}

export default useForm
