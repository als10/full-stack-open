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

let timeoutID

export const setNotification = (message, delay) => {
  return async dispatch => {
    if (timeoutID) clearTimeout(timeoutID)
    dispatch({
      type: 'SET_NOTIF',
      message
    })
    timeoutID = setTimeout(() => {
      dispatch({ type: 'DEL_NOTIF' })
      timeoutID = null
    }, delay * 1000)
  }
}

export default reducer