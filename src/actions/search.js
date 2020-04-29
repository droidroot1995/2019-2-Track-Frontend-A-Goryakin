/* eslint-disable no-alert */
/* eslint-disable dot-notation */
import { GET_SEARCH_LIST_REQUEST, GET_SEARCH_LIST_SUCCESS, GET_SEARCH_LIST_FAILURE } from '../constants/ActionTypes'
import { API_URL } from '../constants/constans'

const getSearchListStarted = () => ({
  type: GET_SEARCH_LIST_REQUEST,
})

const getSearchListSuccess = (chats, messages, users) => ({
  type: GET_SEARCH_LIST_SUCCESS,
  payload: {
    chats,
    messages,
    users,
  },
})

const getSearchListFailure = (error) => ({
  type: GET_SEARCH_LIST_FAILURE,
  payload: {
    error,
  },
})

export const searchChatsAndUsers = (text) => {
  return (dispatch, getState) => {
    dispatch(getSearchListStarted())

    fetch(`${API_URL}/chats/chats_search?topic=${text}`, { credentials: 'include' })
      .then((resp) => resp.json())
      .then((data) => {
        const { chats } = data
        let users = []

        fetch(`${API_URL}/users/search?name=${text}`, { credentials: 'include' })
          .then((respMsg) => respMsg.json())
          .then((usrData) => {
            users = usrData['users']

            if (!text) {
              dispatch(getSearchListSuccess([], [], []))
            } else {
              dispatch(getSearchListSuccess(chats || [], [], users || []))
            }
          })
      })
      .catch((err) => {
        dispatch(getSearchListFailure(err.message))
      })
  }
}

export const searchMessages = (text, chatId) => {
  return (dispatch, getState) => {
    dispatch(getSearchListStarted())

    fetch(`${API_URL}/chats/msg_search?content=${text}&chat_id=${chatId}`, { credentials: 'include' })
      .then((resp) => resp.json())
      .then((data) => {
        const { messages } = data

        if (!text) {
          dispatch(getSearchListSuccess([], [], []))
        } else {
          dispatch(getSearchListSuccess([], messages === undefined ? [] : messages, []))
        }
      })
      .catch((err) => {
        dispatch(getSearchListFailure(err.message))
      })
  }
}

export const clearSearchResults = () => {
  return (dispatch, getState) => {
    dispatch(getSearchListSuccess([], [], []))
  }
}
