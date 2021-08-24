import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import BlogDetails from './components/BlogDetails'

import { createBlog, initializeBlogs } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { initUser, login, resetUser } from './reducers/userReducer'

import { Switch, Route, Link } from 'react-router-dom'

const App = () => {
  const message = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs.sort((a, b) => b.likes - a.likes))
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    dispatch(initUser())
  }, [])

  const notify = (message, success) => {
    dispatch(setNotification(message, success, 5))
  }

  const handleLogin = async (username, password) => {
    try {
      dispatch(login(username, password))
    } catch (exception) {
      notify('wrong username or password', false)
    }
  }

  const logout = () => dispatch(resetUser())

  const addBlog = async (blog) => {
    blogFormRef.current.toggleVisibility()
    try {
      dispatch(createBlog(blog))
      notify(`a new blog ${blog.title} by ${blog.author} added`, true)
    } catch (exception) {
      notify(exception, false)
    }
  }

  const blogForm = () => (
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const blogsList = () => (
    <div className="blogs-list">
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
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
          <Switch>
            <Route path="/users/:id">
              <User />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/blogs/:id">
              <BlogDetails />
            </Route>
            <Route path="/">
              {blogForm()}
              {blogsList()}
            </Route>
          </Switch>
        </div>)}
    </>
  )
}

export default App