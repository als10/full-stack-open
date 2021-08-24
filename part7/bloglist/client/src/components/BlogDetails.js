import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouteMatch, useHistory } from 'react-router'
import { updateBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { addComment as addCommentAction } from '../reducers/blogReducer'

const Comments = ({ id, comments }) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const addComment = (event) => {
    event.preventDefault()
    dispatch(addCommentAction(id, comment))
    setComment('')
  }

  return (
    <div>
      <h3>comments</h3>
      <form onSubmit={addComment}>
        <input
          id="comment"
          type="text"
          value={comment}
          onChange={({ target }) => setComment(target.value)} />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {comments.map((c, i) => <li key={i}>{c}</li>)}
      </ul>
    </div>
  )
}

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
      <Comments id={blog.id} comments={blog.comments} />
    </div>
  )
}

export default BlogDetails