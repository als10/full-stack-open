import React, { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({})

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const notify = (message, success) => {
    setMessage(
      { message: message, success: success }
    )
    setTimeout(() => setMessage({}), 5000)
  }

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      notify('wrong username or password', false)
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  const addBlog = async (blog) => {
    blogFormRef.current.toggleVisibility()
    try {
      const newBlog = await blogService.create(blog)
      setBlogs(blogs.concat(newBlog).sort((a, b) => b.likes - a.likes))
      notify(`a new blog ${newBlog.title} by ${newBlog.author} added`, true)
    } catch (exception) {
      notify(exception, false)
    }
  }

  const updateBlog = async (id, blog) => {
    try {
      const updatedBlog = await blogService.update(id, blog)
      setBlogs(blogs.map(blog =>
        blog.id === id ? { ...updatedBlog, user: blog.user } : blog
      ).sort((a, b) => b.likes - a.likes))
    } catch (exception) {
      notify(exception, false)
    }
  }

  const removeBlog = async (id) => {
    const blog = blogs.find(blog => blog.id === id)
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.remove(id)
        setBlogs(blogs.filter(blog => blog.id !== id))
        notify(`Removed ${blog.title} by ${blog.author}`, true)
      } catch (exception) {
        notify(exception, false)
      }
    }
  }

  const blogForm = () => (
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const blogsList = () => (
    <div>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          updateBlog={updateBlog}
          removeBlog={removeBlog}
        />
      )}
    </div>
  )

  return (
    <>
      {user === null ?
        (<div>
          <h2>Log in to application</h2>
          <Notification message={message} />
          <LoginForm handleLogin={handleLogin}/>
        </div>) :
        (<div>
          <h2>blogs</h2>
          <Notification message={message} />
          <div>
            {user.name} logged in
            <button onClick={logout}>logout</button>
          </div>
          <br />
          {blogForm()}
          {blogsList()}
        </div>)}
    </>
  )
}

export default App