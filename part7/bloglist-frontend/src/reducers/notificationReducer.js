const reducer = (state = {}, action) => {
  switch(action.type) {
  case 'SET_NOTIF':
    return action.content
  case 'DEL_NOTIF':
    return {}
  default:
    return state
  }
}

let timeoutID

export const setNotification = (message, success, delay) => {
  return async dispatch => {
    if (timeoutID) clearTimeout(timeoutID)
    dispatch({
      type: 'SET_NOTIF',
      content: {
        success, message
      }
    })
    timeoutID = setTimeout(() => {
      dispatch({ type: 'DEL_NOTIF' })
      timeoutID = null
    }, delay * 1000)
  }
}

export default reducer