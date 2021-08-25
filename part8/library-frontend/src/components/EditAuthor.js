import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { ALL_AUTHORS, SET_BORN_TO } from '../queries'
import Select from 'react-select'

const EditAuthor = ({ authors }) => {
  const [name, setName] = useState(null)
  const [born, setBorn] = useState('')

  const [ editAuthor ] = useMutation(SET_BORN_TO, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (e) => console.error(e)
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    editAuthor({ variables: { name: name.label, setBornTo: Number(born) } })
    setName(null)
    setBorn('')
  }

  return (
    <div onSubmit={handleSubmit}>
      <h2>Set birthyear</h2>
      <form>
        <Select
          defaultValue={name}
          onChange={setName} 
          options={authors.map(a => ({ value: a.id, label: a.name }))} />
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