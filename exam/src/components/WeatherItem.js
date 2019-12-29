/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import styles from '../styles/WeatherItem.module.css'

const WeatherItem = (props) => {
  const { weather } = props
  const { day, status, icon, temperature, humidity, windDirection, windSpeed, feels } = weather

  const cityTemp = Math.round(temperature - 273.15)
  const feelsLike = Math.round(feels - 273.15)

  let direction = ''

  if (windDirection === 0 || windDirection === 360) {
    direction = 'North'
  } else if (windDirection === 90) {
    direction = 'East'
  } else if (windDirection === 180) {
    direction = 'South'
  } else if (windDirection === 270) {
    direction = 'West'
  } else if (windDirection > 0 && windDirection < 90) {
    direction = 'Northeast'
  } else if (windDirection > 90 && windDirection < 180) {
    direction = 'Southeast'
  } else if (windDirection > 180 && windDirection < 270) {
    direction = 'Southwest'
  } else if (windDirection > 270 && windDirection < 360) {
    direction = 'Northwest'
  }

  return (
    <div className={styles.item}>
      <div className={styles.city_info}>
        <div className={styles.city}>
          <h3 className={styles.day_name}>{day}</h3>
          <h4 className={styles.weather_status}>{status}</h4>
        </div>
        <div className={styles.weather}>
          <img className={styles.icon} src={icon} />
          <h2 className={styles.temperature}>{cityTemp}°C</h2>
        </div>
      </div>
      <div className={styles.weather_info}>
        <h4 className={styles.weather_info_item}>{`Humidity ${humidity}% | ${direction} | ${windSpeed}m/s`}</h4>
        <h4 className={styles.temp_info_item}>{`${cityTemp} / ${feelsLike} °C`}</h4>
      </div>
    </div>
  )
}

export default WeatherItem
