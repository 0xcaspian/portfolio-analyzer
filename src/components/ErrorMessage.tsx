interface ErrorMessageProps {
  message: string
  onClose?: () => void
}

export default function ErrorMessage({ message, onClose }: ErrorMessageProps) {
  return (
    <div className="error-message">
      <div className="error-content">
        <span className="error-icon">⚠️</span>
        <span className="error-text">{message}</span>
        {onClose && (
          <button className="error-close" onClick={onClose}>
            ✕
          </button>
        )}
      </div>
    </div>
  )
}