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

export const setNotification = (message, delay) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIF',
      message
    })
    setTimeout(() => {
      dispatch({ type: 'DEL_NOTIF' })
    }, delay * 1000)
  }
}

export default reducer