import React from 'react'
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
      <strong>added blogs</strong>
      <ul>
        {user.blogs.map(b =>
          <li key={b.id}>{b.title}</li>)}
      </ul>
    </div>
  )
}

export default User