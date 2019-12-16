import {
  GET_MESSAGES_LIST_REQUEST,
  GET_MESSAGES_LIST_SUCCESS,
  GET_MESSAGES_LIST_FAILURE,
} from '../constants/ActionTypes'

const initialState = {
  loading: false,
  messages: [],
  error: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MESSAGES_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case GET_MESSAGES_LIST_SUCCESS:
      return {
        loading: false,
        error: null,
        messages: action.payload,
      }
    case GET_MESSAGES_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      }
    default:
      return state
  }
}
