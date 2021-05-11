import React from 'react';

const Person = ({ person, handleClick }) => {
    return (
        <div>
            {person.name} {person.number}
            <button onClick={handleClick}>delete</button>
        </div>
    )
}

const Persons = ({ persons, handleClick }) => {
  return (
    <div>
        {persons.map(person => {
          return (<Person 
                    key={person.id} 
                    person={person} 
                    handleClick={() => handleClick(person.id)}
                  />
          )
        })}
    </div>
  )
}

export default Persons