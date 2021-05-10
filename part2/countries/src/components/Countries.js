import React from 'react'
import Weather from './Weather'

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

export default Countries