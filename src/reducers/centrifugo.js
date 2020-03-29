import {
  GET_CENT_TOKEN_REQUEST,
  GET_CENT_TOKEN_SUCCESS,
  GET_CENT_TOKEN_FAILURE,
  OPEN_CENT_WS_SUCCESS,
  CLOSE_CENT_WS_SUCCESS,
} from '../constants/ActionTypes'

const initialState = {
  loading: false,
  token: '',
  socket: null,
  error: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CENT_TOKEN_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case GET_CENT_TOKEN_SUCCESS:
      return {
        loading: false,
        error: null,
        token: action.payload,
      }
    case GET_CENT_TOKEN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      }
    case OPEN_CENT_WS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        socket: action.payload,
      }
    case CLOSE_CENT_WS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        socket: action.payload,
      }
    default:
      return state
  }
}
