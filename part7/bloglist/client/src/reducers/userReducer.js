import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const initialState = null

const reducer = (state = initialState, action) => {
  switch(action.type) {
  case 'SET_USER':
    return action.data
  case 'RESET_USER':
    return initialState
  default:
    return state
  }
}

export const initUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch({
        type: 'SET_USER',
        data: user
      })
    }
  }
}

export const login = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch({
        type: 'SET_USER',
        data: user
      })
    } catch (e) {
      dispatch(setNotification('wrong username or password', false, 5))
    }
  }
}

export const resetUser = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedInUser')
    dispatch({ type: 'RESET_USER' })
  }
}

export default reducer