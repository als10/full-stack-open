import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h4>Languages</h4>
      <ul>
        {country.languages.map(language => <li key={language.iso639_1}>{language.name}</li>)}
      </ul>
      <img src={country.flag} width='200px' alt='flag'></img>
    </div>
  )
}

const Countries = ({ countries }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }
  if (countries.length === 1) {
    return <Country country={countries[0]} />
  }
  return (
    <div>
      {countries.map(country => <div key={country.alpha2Code} >{country.name}</div>)}
    </div>
  )
}

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <form>
        <div>
          find countries<input
                          value={filter}
                          onChange={handleFilterChange}
                        />
        </div>
    </form>
  )
}

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  console.log(countries)

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(filter))

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <Countries countries={countriesToShow} />
    </div>
  )
}

export default App