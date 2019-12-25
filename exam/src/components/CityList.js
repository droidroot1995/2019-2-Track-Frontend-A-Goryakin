/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addLocationByGPS } from '../actions/location'
import { setLocation } from '../actions/global'
import styles from '../styles/CityList.module.css'
import CityListItem from './CityListItem'
import CityListHeader from './CityListHeader'
import AddLocationButton from './AddLocationButton'

const CityList = (props) => {
  const { citiesList, addByGPS, setLoc } = props

  const cities = []

  useEffect(() => {
    if (citiesList.length === 0) {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude
          const lon = position.coords.longitude
          addByGPS(lat, lon)
        })
      }
    }
  }, [])

  let list = (
    <div className={styles.cities_list}>
      Городов пока нет. Нажмите на кнопку в правом нижнем углу для добавления нового города.
    </div>
  )

  console.log(citiesList)

  if (citiesList.length > 0) {
    let i = 0
    citiesList.forEach((city) => {
      const cty = (
        <Link to={`/info`} key={i} onClick={() => setLoc(city.coord)}>
          <CityListItem cityInfo={city} />
        </Link>
      )
      i += 1
      cities.push(cty)
    })

    list = <div className={styles.cities_list}>{cities}</div>
  }

  return (
    <div className={styles.city_list}>
      <CityListHeader />
      {list}
      <AddLocationButton />
    </div>
  )
}

const mapStateToProps = (state) => ({
  citiesList: state.global.locations,
})

const mapDispatchToProps = (dispatch) => ({
  addByGPS: (lat, lon) => dispatch(addLocationByGPS(lat, lon)),
  setLoc: (coords) => dispatch(setLocation(coords)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CityList)
