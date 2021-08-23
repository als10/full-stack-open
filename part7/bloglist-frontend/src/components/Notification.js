import React from 'react'

const Notification = ({ message }) => {
  const successStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const errorStyle = { ...successStyle, color: 'red' }

  if (Object.keys(message).length === 0) {
    return null
  }

  return (
    <div style={message.success ? successStyle : errorStyle} className="error">
      {message.message}
    </div>
  )
}

export default Notification