import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouteMatch, useHistory } from 'react-router'
import { updateBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogDetails = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const match = useRouteMatch('/blogs/:id')
  const blog = match
    ? useSelector(state => state.blogs.find(b => b.id === match.params.id))
    : null
  const user = useSelector(state => state.user)

  const likeBlog = () => {
    const updatedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    dispatch(updateBlog(blog.id, updatedBlog))
  }

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        dispatch(deleteBlog(blog.id))
        history.push('/')
        dispatch(setNotification(`Removed ${blog.title} by ${blog.author}`, true))
      } catch (exception) {
        dispatch(setNotification(exception, false))
      }
    }
  }

  if (!blog) return null

  return (
    <div>
      <h2>{blog.title} by {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes
        <button onClick={likeBlog}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      {user.username === blog.user.username &&
        <button onClick={removeBlog}>remove</button>}

      <div>
        <h3>comments</h3>
        <ul>
          {blog.comments.map((c, i) => <li key={i}>{c}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default BlogDetails