import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouteMatch, useHistory } from 'react-router'
import { updateBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { addComment as addCommentAction } from '../reducers/blogReducer'
import { Button, Card, FormControl, InputGroup, ListGroup } from 'react-bootstrap'

const Comments = ({ id, comments }) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const addComment = (event) => {
    event.preventDefault()
    dispatch(addCommentAction(id, comment))
    setComment('')
  }

  return (
    <div style={{ marginTop: 16 }}>
      <h3>Comments</h3>
      <InputGroup>
        <FormControl
          id="comment"
          type="text"
          value={comment}
          onChange={({ target }) => setComment(target.value)} />
        <Button variant="primary" onClick={addComment}>Add Comment</Button>
      </InputGroup>
      <ListGroup>
        {comments.map((c, i) => <ListGroup.Item key={i}>{c}</ListGroup.Item>)}
      </ListGroup>
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
    <div style={{ marginTop: 32 }}>
      <Card>
        <Card.Body>
          <Card.Title>{blog.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{blog.author}</Card.Subtitle>
          <Card.Link href={blog.url}>{blog.url}</Card.Link>
          <div>
            {blog.likes} likes
            <Button variant="primary" size="sm" style={{ marginLeft: 4 }} onClick={likeBlog}>
              Like
            </Button>
          </div>
          <div>added by {blog.user.name}</div>
        </Card.Body>
        {user.username === blog.user.username &&
          <Button variant="primary" onClick={removeBlog}>Remove</Button>}
      </Card>
      <Comments id={blog.id} comments={blog.comments} />
    </div>
  )
}

export default BlogDetails