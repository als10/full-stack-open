import axios from "axios"

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createAnecdote = async (anecdote) => {
  const newObject = {
    content: anecdote,
    votes: 0
  }
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

const functions = { getAll, createAnecdote }

export default functions