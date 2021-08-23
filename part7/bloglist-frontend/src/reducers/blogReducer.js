import blogService from '../services/blogs'

const initialState = []

const reducer = (state = initialState, action) => {
  switch(action.type) {
  case 'NEW_BLOG':
    return state.concat(action.data)
  case 'UPDATE_BLOG': {
    const updatedBlog = action.data
    return state.map(
      b => b.id === updatedBlog.id ? { ...updatedBlog, user: b.user } : b)
  }
  case 'DEL_BLOG':
    return state.filter(blog => blog.id !== action.id)
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

export const updateBlog = (id, blog) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(id, blog)
    dispatch({
      type: 'UPDATE_BLOG',
      data: { ...updatedBlog, id }
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'DEL_BLOG',
      id: id
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