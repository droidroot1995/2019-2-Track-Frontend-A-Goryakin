import { GET_WEATHER_REQUEST, GET_WEATHER_SUCCESS, GET_WEATHER_FAILURE } from '../constants/ActionTypes'

const initialState = {
  loading: false,
  weather: null,
  error: null,
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
    default:
      return state
  }
}
