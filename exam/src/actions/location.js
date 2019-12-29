import {
  GET_WEATHER_REQUEST,
  GET_WEATHER_SUCCESS,
  GET_WEATHER_FAILURE,
  GET_FORECAST_WEATHER_REQUEST,
  GET_FORECAST_WEATHER_SUCCESS,
  GET_FORECAST_WEATHER_FAILURE,
} from '../constants/ActionTypes'
import { API_KEY, ICON_URL, WEATHER_API_URL, FORECAST_API_URL } from '../constants/constants'

import { addLocation } from './global'

const getWeatherStarted = () => ({
  type: GET_WEATHER_REQUEST,
})

const getWeatherSuccess = (weather) => ({
  type: GET_WEATHER_SUCCESS,
  payload: weather,
})

const getWeatherFailure = (error) => ({
  type: GET_WEATHER_FAILURE,
  payload: error,
})

const getForecastWeatherStarted = () => ({
  type: GET_FORECAST_WEATHER_REQUEST,
})

const getForecastWeatherSuccess = (weather) => ({
  type: GET_FORECAST_WEATHER_SUCCESS,
  payload: weather,
})

const getForecastWeatherFailure = (error) => ({
  type: GET_FORECAST_WEATHER_FAILURE,
  payload: error,
})

export const addNewLocation = () => {
  return (dispatch, getState) => {
    const location = prompt('Enter location name, id or (lat;long): ', 0)
    if (location !== 0 && location !== undefined && location !== null) {
      if (!isNaN(location)) {
        dispatch(getWeatherStarted())
        fetch(`${WEATHER_API_URL}?id=${parseInt(location)}&appid=${API_KEY}`)
          .then((resp) => resp.json())
          .then((data) => {
            //console.log(data)
            const locationInfo = {
              coord: data.coord,
              icon: `${ICON_URL}${data.weather[0].icon}@2x.png`,
              location: false,
              temperature: data.main.temp,
              humidity: data.main.humidity,
              windDirection: data.wind.deg,
              windSpeed: data.wind.speed,
              country: data.sys.country,
              feels: data.main.feels_like,
              city: data.name,
            }
            addLocation(locationInfo)(dispatch, getState)
            dispatch(getWeatherSuccess(locationInfo))
          })
          .catch((err) => dispatch(getWeatherFailure(err)))
      } else {
        const loc = location.split(';')

        //console.log(loc)

        if (loc.length === 1) {
          dispatch(getWeatherStarted())
          fetch(`${WEATHER_API_URL}?q=${loc}&appid=${API_KEY}`)
            .then((resp) => resp.json())
            .then((data) => {
              //console.log(data)
              const locationInfo = {
                coord: data.coord,
                icon: `${ICON_URL}${data.weather[0].icon}@2x.png`,
                location: false,
                temperature: data.main.temp,
                humidity: data.main.humidity,
                windDirection: data.wind.deg,
                windSpeed: data.wind.speed,
                country: data.sys.country,
                feels: data.main.feels_like,
                city: data.name,
              }
              addLocation(locationInfo)(dispatch, getState)
              dispatch(getWeatherSuccess(data))
            })
            .catch((err) => dispatch(getWeatherFailure(err)))
        } else if (loc.length === 2) {
          dispatch(getWeatherStarted())
          fetch(`${WEATHER_API_URL}?lat=${parseFloat(loc[0])}&lon=${parseFloat(loc[1])}&appid=${API_KEY}`)
            .then((resp) => resp.json())
            .then((data) => {
              //console.log(data)
              const locationInfo = {
                coord: data.coord,
                icon: `${ICON_URL}${data.weather[0].icon}@2x.png`,
                location: false,
                temperature: data.main.temp,
                humidity: data.main.humidity,
                windDirection: data.wind.deg,
                windSpeed: data.wind.speed,
                country: data.sys.country,
                feels: data.main.feels_like,
                city: data.name,
              }
              addLocation(locationInfo)(dispatch, getState)
              dispatch(getWeatherSuccess(data))
            })
            .catch((err) => dispatch(getWeatherFailure(err)))
        }
      }
    }
  }
}

export const addLocationByGPS = (lat, lon) => {
  return (dispatch, getState) => {
    dispatch(getWeatherStarted())
    fetch(`${WEATHER_API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
      .then((resp) => resp.json())
      .then((data) => {
        const locationInfo = {
          coord: data.coord,
          icon: `${ICON_URL}${data.weather[0].icon}@2x.png`,
          location: true,
          temperature: data.main.temp,
          humidity: data.main.humidity,
          windDirection: data.wind.deg,
          windSpeed: data.wind.speed,
          country: data.sys.country,
          feels: data.main.feels_like,
          city: data.name,
        }
        addLocation(locationInfo)(dispatch, getState)
        dispatch(getWeatherSuccess(data))
      })
      .catch((err) => dispatch(getWeatherFailure(err)))
  }
}

export const getForecastWeather = (lat, lon) => {
  return (dispatch, getState) => {
    dispatch(getForecastWeatherStarted())
    fetch(`${FORECAST_API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
      .then((resp) => resp.json())
      .then((data) => {
        dispatch(getForecastWeatherSuccess(data))
      })
      .catch((err) => dispatch(getForecastWeatherFailure(err)))
  }
}
