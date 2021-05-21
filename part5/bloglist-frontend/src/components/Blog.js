import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const details = () => (
    <div>
      <div>{blog.url}</div>
      <div>
        likes {blog.likes}
        <button>like</button>
      </div>
      <div>{blog.user.name}</div>  
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