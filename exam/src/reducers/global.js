import {
  CHANGE_GLOBAL_REQUEST,
  CHANGE_GLOBAL_FAILURE,
  CHANGE_GLOBAL_SUCCESS,
  CHANGE_COORDS_REQUEST,
  CHANGE_COORDS_SUCCESS,
  CHANGE_COORDS_FAILURE,
} from '../constants/ActionTypes'

const initialState = {
  loading: false,
  coordsLoading: false,
  forecastLoading: false,
  coords: {
    lat: 0,
    lon: 0,
  },
  forecast: null,
  locations: [],
  error: null,
  coordsError: null,
  forecastError: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_GLOBAL_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case CHANGE_GLOBAL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        locations: [...state.locations, action.payload.location],
      }
    case CHANGE_GLOBAL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      }
    case CHANGE_COORDS_REQUEST:
      return {
        ...state,
        coordsLoading: true,
      }
    case CHANGE_COORDS_SUCCESS:
      return {
        ...state,
        coordsLoading: false,
        coordsError: null,
        coords: action.payload.coords,
      }
    case CHANGE_COORDS_FAILURE:
      return {
        ...state,
        coordsLoading: false,
        coordsError: action.payload.error,
      }
    default:
      return state
  }
}
