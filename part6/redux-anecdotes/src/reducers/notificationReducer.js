const reducer = (state = null, action) => {
  switch(action.type) {
    case 'SET_NOTIF':
      return action.message
    case 'DEL_NOTIF':
      return null
    default:
      return state
  }
}

export const setNotification = (message) => {
  return {
    type: 'SET_NOTIF',
    message
  }
}

export const removeNotification = () => {
  return {
    type: 'DEL_NOTIF',
  }
}

export default reducer