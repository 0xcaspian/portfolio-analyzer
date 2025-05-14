import { useEffect, useState } from 'react'

interface NotificationProps {
  message: string
  type: 'success' | 'info' | 'warning' | 'error'
  duration?: number
  onClose?: () => void
}

export default function Notification({ 
  message, 
  type, 
  duration = 3000, 
  onClose 
}: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => onClose?.(), 300) // Wait for animation
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  if (!isVisible) return null

  const icons = {
    success: '✅',
    info: 'ℹ️',
    warning: '⚠️',
    error: '❌'
  }

  return (
    <div className={`notification notification-${type} ${isVisible ? 'visible' : 'hidden'}`}>
      <span className="notification-icon">{icons[type]}</span>
      <span className="notification-message">{message}</span>
      {onClose && (
        <button className="notification-close" onClick={() => setIsVisible(false)}>
          ✕
        </button>
      )}
    </div>
  )
}