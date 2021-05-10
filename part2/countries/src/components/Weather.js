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

export default Weather