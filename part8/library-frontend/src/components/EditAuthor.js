import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { ALL_AUTHORS, SET_BORN_TO } from '../queries'

const EditAuthor = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [ editAuthor ] = useMutation(SET_BORN_TO, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (e) => console.error(e)
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    editAuthor({ variables: { name, setBornTo: Number(born) } })
    setName('')
    setBorn('')
  }

  return (
    <div onSubmit={handleSubmit}>
      <h2>Set birthyear</h2>
      <form>
        <div>
          name
          <input
            type="text"
            value={name}
            onChange={({ target }) => setName(target.value)} />
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)} />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default EditAuthor