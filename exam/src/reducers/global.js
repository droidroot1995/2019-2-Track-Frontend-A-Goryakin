import { GET_GLOBAL_REQUEST, GET_GLOBAL_FAILURE, GET_GLOBAL_SUCCESS } from '../constants/ActionTypes'

const initialState = {
  loading: false,
  selected: -1,
  locations: [],
  error: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_GLOBAL_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case GET_GLOBAL_SUCCESS:
      return {
        loading: false,
        error: null,
        selected: action.payload.selected,
        locations: action.payload.locations,
      }
    case GET_GLOBAL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      }
    default:
      return state
  }
}
