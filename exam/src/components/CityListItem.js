/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import styles from '../styles/CityListItem.module.css'

const CityListItem = (props) => {
  const { cityInfo } = props
  const { city, location, country, icon, temperature, humidity, windDirection, windSpeed, feels } = cityInfo

  const cityTemp = Math.round(temperature - 273.15)
  const feelsLike = Math.round(feels - 273.15)

  let userLocation = ''
  if (location) {
    userLocation = (
      <svg className={styles.location} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
        <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z" />
      </svg>
    )
  }

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
          <h3 className={styles.city_name}>{city}</h3>
          {userLocation}
          <h4 className={styles.country_name}>{country}</h4>
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

export default CityListItem
