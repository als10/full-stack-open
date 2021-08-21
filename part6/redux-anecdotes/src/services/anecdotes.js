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

const updateAnecdote = async (id, updatedObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedObject)
  return response.data
}

const functions = { getAll, createAnecdote, updateAnecdote }

export default functions