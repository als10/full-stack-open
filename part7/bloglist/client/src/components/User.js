import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router'


const User = () => {
  const match = useRouteMatch('/users/:id')
  const user = match
    ? useSelector(state => state.users.find(u => u.id === match.params.id))
    : null

  if (!user) return null

  return (
    <div>
      <h2>{user.name}</h2>
      <strong>Added blogs</strong>
      <ListGroup style={{ marginTop: 16 }}>
        {user.blogs.map(b =>
          <ListGroup.Item key={b.id}>{b.title}</ListGroup.Item>)}
      </ListGroup>
    </div>
  )
}

export default User