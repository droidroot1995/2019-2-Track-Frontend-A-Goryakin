/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import styles from '../styles/CityListItem.module.css'

const CityListItem = (props) => {
  const { cityInfo } = props
  const {
    city,
    location,
    country,
    weather,
    temperature,
    humidity,
    windDirection,
    windSpeed,
    temperatureInfo,
  } = cityInfo

  let userLocation = ''
  if (location) {
    userLocation = (
      <svg className={styles.location} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
        <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z" />
      </svg>
    )
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
          <img className={styles.icon} src={weather} />
          <h2 className={styles.temperature}>{temperature}</h2>
        </div>
      </div>
      <div className={styles.weather_info}>
        <span className={styles.weather_info_item}>
          Humidity {humidity}|{windDirection}|{windSpeed}m/s
        </span>
        <h3 className={styles.weather_info_item}>{temperatureInfo}</h3>
      </div>
    </div>
  )
}

export default CityListItem
