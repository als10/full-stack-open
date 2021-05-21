import React, { useState } from 'react'

const Blog = ({ blog, user, updateBlog, removeBlog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const likeBlog = () => {
    const updatedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    updateBlog(blog.id, updatedBlog)
  }

  const details = () => (
    <div>
      <div>{blog.url}</div>
      <div>
        likes {blog.likes}
        <button onClick={likeBlog}>like</button>
      </div>
      <div>{blog.user.name}</div>
      {user.username === blog.user.username &&
      (<button onClick={() => removeBlog(blog.id)}>remove</button>)}
    </div>
  )

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => setDetailsVisible(!detailsVisible)}>
        {detailsVisible ? 'hide' : 'view'}
      </button>
      {detailsVisible && details()}
    </div>
  )
}

export default Blog