import { useEffect, useRef } from 'react'

export function useAutoRefresh(callback: () => void, interval: number, enabled: boolean = true) {
  const intervalRef = useRef<NodeJS.Timeout>()
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    if (!enabled) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      return
    }

    intervalRef.current = setInterval(() => {
      callbackRef.current()
    }, interval * 60 * 1000) // Convert minutes to milliseconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [interval, enabled])

  return () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }
}