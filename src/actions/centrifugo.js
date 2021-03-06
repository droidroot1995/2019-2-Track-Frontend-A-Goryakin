/* eslint-disable dot-notation */
import Centrifuge from 'centrifuge'
import {
  GET_CENT_TOKEN_REQUEST,
  GET_CENT_TOKEN_SUCCESS,
  GET_CENT_TOKEN_FAILURE,
  OPEN_CENT_WS_SUCCESS,
  CLOSE_CENT_WS_SUCCESS,
} from '../constants/ActionTypes'

import { API_URL } from '../constants/constans'

const sendTokenStarted = () => ({
  type: GET_CENT_TOKEN_REQUEST,
})

const sendTokenSuccess = (ctoken) => ({
  type: GET_CENT_TOKEN_SUCCESS,
  payload: ctoken,
})

const sendTokenFailure = (error) => ({
  type: GET_CENT_TOKEN_FAILURE,
  payload: {
    error,
  },
})

const openWSSuccess = (socket) => ({
  type: OPEN_CENT_WS_SUCCESS,
  payload: {
    socket,
  },
})

const closeWSSuccess = (socket) => ({
  type: CLOSE_CENT_WS_SUCCESS,
  payload: {
    socket,
  },
})

export const getToken = () => {
  return (dispatch, getState) => {
    dispatch(sendTokenStarted())

    fetch(`${API_URL}/centrifugo/`, { method: 'GET', credentials: 'include' })
      .then((resp) => resp.json())
      .then((dat) => {
        dispatch(sendTokenSuccess(dat.token))
      })
      .catch((err) => dispatch(sendTokenFailure(err.message)))
  }
}

export const openWebSocket = (ctoken) => {
  return (dispatch, getState) => {
    const socket = new Centrifuge('wss://alexander-goryakin.droidroot1995.tk/centrifugo/connection/websocket', {
      retry: true,
      resubscribe: true,
    })
    socket.setToken(ctoken)

    socket.on('connect', (context) => {
      socket.subscribe.bind(context)
      socket.disconnect.bind(context)

      dispatch(openWSSuccess(socket))
    })

    socket.connect()
  }
}

export const closeWebSocket = (socket) => {
  return (dispatch, getState) => {
    if (socket.socket !== undefined && socket.socket !== null) {
      socket.socket.disconnect()
      dispatch(closeWSSuccess(null))
    }
  }
}
