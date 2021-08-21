import anecdotesService from '../services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'VOTE':
      const updatedAnecdote = action.data
      return state.map(a => a.id === updatedAnecdote.id ? updatedAnecdote : a)
    case 'NEW_ANECDOTE':
      const anecdote = action.data
      return state.concat(anecdote)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const voteFor = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    const returnedObject = await anecdotesService.updateAnecdote(anecdote.id, updatedAnecdote)
    dispatch({
      type: 'VOTE',
      data: returnedObject
    })
  }
}

export const createAnecdote = (anecdote) => {
  return async dispatch => {
    const newObject = await anecdotesService.createAnecdote(anecdote)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newObject
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default reducer