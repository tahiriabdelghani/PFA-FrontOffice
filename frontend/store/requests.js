import { useState, useCallback } from 'react'

export const digitalHost = 'http://localhost:5000/api/digital-audit'
export const strategicHost = 'http://localhost:5000/api/audit-strategique'
export const culturalHost='http://localhost:5000/api/cultural-audit'


const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : 'GET',
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      })

      if (!response.ok) {
        throw new Error('Request failed!')
      }

      const data = await response.json()
      applyData(data)
    } catch (err) {
      setError(err.message || 'Something went wrong!')
    }
    setIsLoading(false)
  }, [])

  return {
    isLoading,
    error,
    sendRequest,
  }
}

export default useHttp

export const useHttpImages = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : 'GET',
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? requestConfig.body : null,
      })

      if (!response.ok) {
        throw new Error('Request failed!')
      }

      const data = await response.json()
      applyData(data)
    } catch (err) {
      setError(err.message || 'Something went wrong!')
    }
    setIsLoading(false)
  }, [])

  return {
    isLoading,
    error,
    sendRequest,
  }
}
