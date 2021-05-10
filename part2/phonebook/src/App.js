import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { 
      name: 'Arto Hellas',
      number: '040-1234567'
    }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [filter, setFilter] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.map(person => person.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const person = {
      name: newName,
      number: newNumber
    }
  
    setPersons(persons.concat(person))
    setNewName('')
    setNewNumber('')
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().startsWith(filter))

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          filter shown with<input
                              value={filter}
                              onChange={handleFilterChange}
                           />
        </div>
      </form>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input
                  value={newName}
                  onChange={handleNameChange}
                />
        </div>
        <div>
          number: <input 
                    value={newNumber}
                    onChange={handleNumberChange}
                  />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map(person => <div key={person.name}>{person.name} {person.number}</div>)}
    </div>
  )
}

export default App