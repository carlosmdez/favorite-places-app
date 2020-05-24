import { useState, useCallback, useRef, useEffect } from 'react'

const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const activeHttpRequests = useRef([])

  const sendRequest = useCallback(
    async (url, method = 'GET', headers = {}, body = null) => {
      setIsLoading(true)

      const httpAbortController = new AbortController()
      activeHttpRequests.current.push(httpAbortController)

      try {
        const response = await fetch(url, {
          method,
          headers,
          body,
          signal: httpAbortController.signal
        })

        const responseData = await response.json()

        activeHttpRequests.current = activeHttpRequests.current.filter(
          reqControl => reqControl !== httpAbortController
        )

        if (!response.ok) {
          throw new Error(responseData.message)
        }

        setIsLoading(false)

        return responseData
      } catch (err) {
        setError(err.message)
        setIsLoading(false)
        throw err.message
      }
    },
    []
  )

  const clearError = () => {
    setError(null)
  }

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach(abortController =>
        abortController.abort()
      )
    }
  }, [])

  return { isLoading, error, sendRequest, clearError }
}

export default useHttpClient
