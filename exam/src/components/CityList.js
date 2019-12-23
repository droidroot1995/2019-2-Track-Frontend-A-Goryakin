/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
//import { getGlobal } from '../actions/global'
import styles from '../styles/CityList.module.css'
import CityListItem from './CityListItem'
import AddLocationButton from './AddLocationButton'

const CityList = (props) => {
  const { citiesList, getCitiesList, setGState } = props

  const cities = []

  /* useEffect(() => {
    const interval = setInterval(() => getCitiesList(), 500)

    return () => {
      clearInterval(interval)
    }
  }, [getCitiesList]) */

  let list = (
    <div className={styles.cities_list}>
      Сообщений пока нет. Нажмите на кнопку в правом нижнем углу для создания нового чата.
    </div>
  )

  /*if (citiesList.length > 0) {
    let i = 0
    citiesList.forEach((city) => {
      const cty = (
        <Link to={`/city?id=${city.id}`} key={i} onClick={() => setGState(city.coord)}>
          <CityListItem chatInfo={city} />
        </Link>
      )
      i += 1
      cities.push(cty)
    })

    list = <div className={styles.cities_list}>{cities}</div>
  } */

  return (
    <div className={styles.chat_list}>
      {list}
      <AddLocationButton />
    </div>
  )
}

const mapStateToProps = (state) => ({
  // chatsList: state.chats.cities,
})

/* const mapDispatchToProps = (dispatch) => ({
  getCitiesList: () => dispatch(getCities()),
  setGState: (city) => dispatch(getGlobal(city)),
}) */

export default connect(
  null, //mapStateToProps,
  // mapDispatchToProps,
)(CityList)
