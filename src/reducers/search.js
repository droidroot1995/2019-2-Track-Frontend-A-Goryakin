import { GET_SEARCH_LIST_REQUEST, GET_SEARCH_LIST_FAILURE, GET_SEARCH_LIST_SUCCESS } from '../constants/ActionTypes'

const initialState = {
  loading: false,
  chats: [],
  messages: [],
  users: [],
  error: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SEARCH_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case GET_SEARCH_LIST_SUCCESS:
      return {
        loading: false,
        error: null,
        chats: action.payload.chats,
        messages: action.payload.messages,
        users: action.payload.users,
      }
    case GET_SEARCH_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      }
    default:
      return state
  }
}
