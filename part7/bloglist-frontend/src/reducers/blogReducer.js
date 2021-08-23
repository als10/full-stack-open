import blogService from '../services/blogs'

const initialState = []

const reducer = (state = initialState, action) => {
  switch(action.type) {
  case 'NEW_BLOG':
    return state.concat(action.data)
  case 'INIT_BLOGS':
    return action.data
  default:
    return state
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const newObject = await blogService.create(blog)
    dispatch({
      type: 'NEW_BLOG',
      data: newObject
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export default reducer