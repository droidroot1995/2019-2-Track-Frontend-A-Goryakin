import {
  GET_RTC_MESSAGE_SUCCESS,
  SET_RTC_UID_SUCCESS,
  RTC_CONNECT_SUCCESS,
  RTC_CONNECT_FAILURE,
  RTC_DISCONNECT_SUCCESS,
} from '../constants/ActionTypes'

const initialState = {
  userId: -1,
  connectId: -1,
  messages: [],
  connected: false,
  connection: null,
  error: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_RTC_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        messages: [...state.messages, action.payload],
      }
    case SET_RTC_UID_SUCCESS:
      return {
        ...state,
        loading: false,
        userId: action.payload,
      }
    case RTC_CONNECT_SUCCESS:
      return {
        ...state,
        connected: action.payload,
      }
    case RTC_CONNECT_FAILURE:
      return {
        ...state,
        error: action.payload,
      }
    case RTC_DISCONNECT_SUCCESS:
      return {
        ...state,
        connected: action.payload,
      }
    default:
      return state
  }
}
