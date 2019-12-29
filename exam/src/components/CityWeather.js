/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import CityWeatherHeader from './CityWeatherHeader'
import WeatherItem from './WeatherItem'
import { getForecastWeather } from '../actions/location'
import { ICON_URL } from '../constants/constants'
import styles from '../styles/CityWeather.module.css'

const CityWeather = (props) => {
  const { coords, forecast, getForecast } = props

  useEffect(() => getForecast(coords.lat, coords.lon), [coords.lat, coords.lon, getForecast])

  const content = []

  let list = <div className={styles.weather}>No weather info</div>

  let cityName = ''

  if (forecast !== null && forecast !== undefined) {
    console.log(forecast)
    cityName = `${forecast.city.name}, ${Math.round(forecast.list[0].main.temp - 273.15)} °C,
         ${forecast.list[0].weather[0].main}`

    forecast.list.forEach((wthr, idx) => {
      const weather = {
        temperature: wthr.main.temp,
        humidity: wthr.main.humidity,
        icon: `${ICON_URL}${wthr.weather[0].icon}@2x.png`,
        status: `${wthr.weather[0].main}, ${wthr.weather[0].description}`,
        day: wthr.dt_txt,
        windDirection: wthr.wind.deg,
        windSpeed: wthr.wind.speed,
        feels: wthr.main.feels_like,
      }

      const item = <WeatherItem key={idx} weather={weather} />

      content.push(item)
    })

    list = <div className={styles.weather}>{content}</div>
  }

  return (
    <div className={styles.weather_list}>
      <CityWeatherHeader name={cityName} />
      {list}
    </div>
  )
}

const mapStateToProps = (state) => ({
  forecast: state.location.forecast,
  coords: state.global.coords,
})

const mapDispatchToProps = (dispatch) => ({
  getForecast: (lat, lon) => dispatch(getForecastWeather(lat, lon)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CityWeather)
