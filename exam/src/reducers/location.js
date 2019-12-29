import {
  GET_WEATHER_REQUEST,
  GET_WEATHER_SUCCESS,
  GET_WEATHER_FAILURE,
  GET_FORECAST_WEATHER_REQUEST,
  GET_FORECAST_WEATHER_SUCCESS,
  GET_FORECAST_WEATHER_FAILURE,
} from '../constants/ActionTypes'

const initialState = {
  loading: false,
  floading: false,
  weather: null,
  forecast: null,
  error: null,
  ferror: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_WEATHER_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case GET_WEATHER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        weather: action.payload,
      }
    case GET_WEATHER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      }
    case GET_FORECAST_WEATHER_REQUEST:
      return {
        ...state,
        floading: true,
      }
    case GET_FORECAST_WEATHER_SUCCESS:
      return {
        ...state,
        floading: false,
        ferror: null,
        forecast: action.payload,
      }
    case GET_FORECAST_WEATHER_FAILURE:
      return {
        ...state,
        floading: false,
        ferror: action.payload.error,
      }
    default:
      return state
  }
}
