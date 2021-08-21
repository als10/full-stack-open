import React from 'react'
import { voteFor } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import Notification from './Notification'
import { setNotification } from '../reducers/notificationReducer'
import Filter from './Filter'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes
    .filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase()))
    .sort((a, b) => b.votes - a.votes)
  )
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(voteFor(anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList