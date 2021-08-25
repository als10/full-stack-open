import React from 'react'
import { Alert } from 'react-bootstrap'

const Notification = ({ message }) => {
  if (Object.keys(message).length === 0) {
    return null
  }

  return (
    <div className="container">
      <Alert
        variant={message.success ? 'success' : 'danger'}
        className="error"
      >
        {message.message}
      </Alert>
    </div>
  )
}

export default Notification