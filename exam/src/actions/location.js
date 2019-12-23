import { GET_WEATHER_REQUEST, GET_WEATHER_SUCCESS, GET_WEATHER_FAILURE } from '../constants/ActionTypes'
import { API_KEY } from '../constants/constants'

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

export const addNewLocation = () => {
  return (dispatch, getState) => {
    console.log(getState().global.locations)
    const location = prompt('Enter location name, id or (lat;long): ', 0)
    if (location !== 0) {
      if (!isNaN(location)) {
        dispatch(getWeatherStarted())
        fetch(`https://api.openweathermap.org/data/2.5/weather?id=${parseInt(location)}&appid=${API_KEY}`)
          .then((resp) => resp.json())
          .then((data) => {
            //console.log(data)
            const locationInfo = {
              coord: data.coord,
              icon: data.weather[0].icon,
              temperature: data.main.temp,
              humidity: data.main.humidity,
              wind: data.wind.deg,
              windSpeed: data.wind.speed,
              country: data.sys.country,
              city: data.name,
            }
            getState().global.locations.push(locationInfo)
            dispatch(getWeatherSuccess(locationInfo))
          })
          .catch((err) => dispatch(getWeatherFailure(err)))
      } else {
        const loc = location.split(';')

        //console.log(loc)

        if (loc.length === 1) {
          dispatch(getWeatherStarted())
          fetch(`https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${API_KEY}`)
            .then((resp) => resp.json())
            .then((data) => {
              //console.log(data)
              const locationInfo = {
                coord: data.coord,
                icon: data.weather[0].icon,
                temperature: data.main.temp,
                humidity: data.main.humidity,
                wind: data.wind.deg,
                windSpeed: data.wind.speed,
                country: data.sys.country,
                city: data.name,
              }
              getState().global.locations.push(locationInfo)
              dispatch(getWeatherSuccess(data))
            })
            .catch((err) => dispatch(getWeatherFailure(err)))
        } else if (loc.length === 2) {
          dispatch(getWeatherStarted())
          fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${parseFloat(loc[0])}&lon=${parseFloat(
              loc[1],
            )}&appid=${API_KEY}`,
          )
            .then((resp) => resp.json())
            .then((data) => {
              //console.log(data)
              const locationInfo = {
                coord: data.coord,
                icon: data.weather[0].icon,
                temperature: data.main.temp,
                humidity: data.main.humidity,
                wind: data.wind.deg,
                windSpeed: data.wind.speed,
                country: data.sys.country,
                city: data.name,
              }
              getState().global.locations.push(locationInfo)
              dispatch(getWeatherSuccess(data))
            })
            .catch((err) => dispatch(getWeatherFailure(err)))
        }
      }
    }
  }
}
