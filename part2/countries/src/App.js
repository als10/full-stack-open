import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ city }) => {
  const [weather, setWeather] = useState({})

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY
    let isMounted = true
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${city}/`)
      .then(response => {
        if (isMounted) setWeather(response.data.current)
      })
      return () => { isMounted = false }
  }, [city])

  if (Object.keys(weather).length === 0) return <div>Weather data not loaded yet</div>

  return (
    <div>
      <h4>Weather in {city}</h4>
      <div>
        <strong>temperature: </strong> {weather.temperature} degrees Celsius
      </div>
      <img src={weather.weather_icons[0]} alt='Weather Icon'></img>
      <div>
        <strong>wind: </strong> {weather.wind_speed} mph direction {weather.wind_dir}
      </div>
    </div>
  )
}

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h4>Spoken Languages</h4>
      <ul>
        {country.languages.map(language => <li key={language.iso639_1}>{language.name}</li>)}
      </ul>
      <img src={country.flag} width='200px' alt='flag'></img>
      <Weather city={country.capital} />
    </div>
  )
}

const Countries = ({ countries, handleClick }) => {
  if (countries.length === 1) return <Country country={countries[0]} />


  return countries.length > 10
  ? <div>Too many matches, specify another filter</div>
  : (
      <div>
        {countries.map(country => {
          return (
            <div key={country.alpha2Code} >
              {country.name}
              <button onClick={() => handleClick(country.name)} >show</button>
            </div>
          )
        })}
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

  const handleFilterChange = event => setFilter(event.target.value)

  const handleClick = country => setFilter(country)

  const countriesToShow = countries.filter(countries.map(countries => countries.name).includes(filter)
  ? country => country.name === filter
  : country => country.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <Countries countries={countriesToShow} handleClick={handleClick} />
    </div>
  )
}

export default App