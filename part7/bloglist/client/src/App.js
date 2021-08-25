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

import { Switch, Route, useHistory } from 'react-router-dom'

import { Button, Container, Nav, Navbar, Table } from 'react-bootstrap'

const App = () => {
  const message = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs.sort((a, b) => b.likes - a.likes))
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

  const blogFormRef = useRef()

  const history = useHistory()

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

  const logout = () => {
    dispatch(resetUser())
    history.push('/')
  }

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
    <Togglable buttonLabel='Create a New Blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const blogsList = () => (
    <Table striped hover className="blogs-list">
      <tbody>
        {blogs.map(blog =>
          <tr key={blog.id}>
            <td><Blog blog={blog} /></td>
          </tr>
        )}
      </tbody>
    </Table>
  )

  return (
    <div>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand>Blog App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          {user &&
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Blogs</Nav.Link>
                <Nav.Link href="/users">Users</Nav.Link>
              </Nav>
              <Nav style={{ marginLeft: 'auto' }}>
                <Navbar.Text>{user.name} logged in</Navbar.Text>
                <Button variant="primary" style={{ marginLeft: 16 }} onClick={logout}>
                  Logout
                </Button>
              </Nav>
            </Navbar.Collapse>}
        </Container>
      </Navbar>

      {user === null
        ?
        <div className="container">
          <h2>Log in to application</h2>
          <Notification message={message} />
          <LoginForm handleLogin={handleLogin}/>
        </div>
        :
        <div className="container">
          <Notification message={message} />

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
        </div>}
    </div>
  )
}

export default App