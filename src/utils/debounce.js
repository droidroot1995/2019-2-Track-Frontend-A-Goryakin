import { useState, useEffect } from 'react'

export const useDebounce = (value, delay) => {
  const [debouceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value)
    }, delay)

    return () => {
      clearTimeout(timeout)
    }
  }, [setDebounceValue, delay, value])

  return debouceValue
}
