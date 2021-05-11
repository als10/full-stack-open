import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState({})

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const updatePerson = (id) => {
    const result = window.confirm(
      `${newName} is already added to phonebook, replace the old number with a new one?`
    )
    
    if (!result) return

    const person = persons.find(p => p.id === id)
    const updatedPerson = {...person, number: newNumber}
    personService
      .update(id, updatedPerson)
      .then(returnedPerson => {
        setPersons(
          persons.map(
            person => person.id === id
                      ? returnedPerson
                      : person
          )
        )
        setMessage(
          {
            message: `Changed ${updatedPerson.name}'s number`,
            success: true
          }
        )
        setTimeout(() => setMessage({}), 5000)
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        setMessage(
          {
            message: `Information of ${updatedPerson.name} has already been removed from the server`,
            success: false
          }
        )
        setTimeout(() => setMessage({}), 5000)
        setPersons(persons.filter(person => person.id !== id))
      })
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (newName === '' || newNumber === '') return

    if (persons.map(person => person.name).includes(newName)) {
      updatePerson(persons.find(p => p.name === newName).id)
      return
    }

    const person = {
      name: newName,
      number: newNumber
    }

    personService
      .create(person)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setMessage(
          {
            message: `Added ${person.name}`,
            success: true
          }
        )
        setTimeout(() => setMessage({}), 5000)
        setNewName('')
        setNewNumber('')
      })
  }

  const deletePerson = (id) => {
    const name = persons.find(person => person.id === id).name
    const result = window.confirm(
      `Delete ${name}?`
    )
    if (!result) return
    personService
      .remove(id)
      .then(() => {
        setMessage(
          {
            message: `Deleted ${name}`,
            success: true
          }
        )
        setTimeout(() => setMessage({}), 5000)
        setPersons(persons.filter(person => person.id !== id))
      })
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().startsWith(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} />

      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons persons={personsToShow} handleClick={deletePerson} />
    </div>
  )
}

export default App