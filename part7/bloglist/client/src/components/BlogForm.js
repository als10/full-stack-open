import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

const CreateBlog = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleClick = (event) => {
    event.preventDefault()
    createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div style={{ marginTop: 16, marginBottom: 16 }} className='blogFormDiv'>
      <h3>Create a New Blog</h3>
      <Form onSubmit={handleClick}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            id="title"
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />

          <Form.Label>Author</Form.Label>
          <Form.Control
            id="author"
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />

          <Form.Label>URL</Form.Label>
          <Form.Control
            id="url"
            type="text"
            value={url}
            name="URL"
            onChange={({ target }) => setUrl(target.value)}
          />

          <Button style={{ marginTop: 16 }} variant="primary" type="submit" id="create-blog-btn">
            Create
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default CreateBlog