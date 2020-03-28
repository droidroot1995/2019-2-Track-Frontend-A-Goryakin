/* eslint-disable eqeqeq */
/* eslint-disable dot-notation */

import Peer from 'peerjs'
import {
  GET_RTC_MESSAGE_SUCCESS,
  SET_RTC_UID_SUCCESS,
  RTC_CONNECT_SUCCESS,
  RTC_DISCONNECT_SUCCESS,
} from '../constants/ActionTypes'

let peer = null
let connection = null

const getChatMessageSuccess = (messages) => ({
  type: GET_RTC_MESSAGE_SUCCESS,
  payload: messages,
})

const setConnectUserId = (uid) => ({
  type: SET_RTC_UID_SUCCESS,
  payload: {
    uid,
  },
})

const setConnectedSuccess = (state) => ({
  type: RTC_CONNECT_SUCCESS,
  payload: {
    state,
  },
})

const setDisconnectedSuccess = (state) => ({
  type: RTC_DISCONNECT_SUCCESS,
  payload: {
    state,
  },
})

export const setRtcUserId = (userId) => {
  return (dispatch, getState) => {
    // eslint-disable-next-line no-alert
    const uid = prompt('Введите id пользователя для установки соединения', -1)
    dispatch(setConnectUserId(uid))
  }
}

export const clearRtcUserId = () => {
  return (dispatch, getState) => {
    dispatch(setConnectUserId(-1))
  }
}

export const openWebRtc = (userId) => {
  // (userId, connectId) => {
  return (dispatch, getState) => {
    peer = new Peer(userId.toString(), {
      host: '192.168.0.107',
      port: 9000,
      path: '/messenger',
      key: 'lwjd5qra8257b9',
      // debug: 3,
      config: {
        iceServers: [
          { url: 'stun:stun.l.google.com:19302' },
          {
            url: 'turn:numb.viagenie.ca',
            credential: 'muazkh',
            username: 'webrtc@live.com',
          },
        ],
        sdpSemantics: 'unified-plan',
        iceTransportPolicy: 'relay',
      },
    })

    peer.on('open', (id) => {
      // console.log(`ID: ${id}`)
    })
  }
}

export const connectWebRtc = (userId, connectId) => {
  return (dispatch, getState) => {
    if (connectId !== -1) {
      connection = peer.connect(connectId.toString(), {
        serialization: 'none',
        reliable: true,
      })

      peer.on('connection', (conn) => {
        // console.log(conn)
        connection = conn
        peer.connect(connection.peer)
      })

      connection.on('open', () => {
        connection.on('data', (data) => {
          // console.log(data)
          const recvMsg = data // data.data.message

          const date = new Date()

          const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`

          const msg = {
            name: '',
            msg: {
              attachments: [],
              msg: recvMsg.content,
              audios: [],
            },
            status: 'sent',
            self: recvMsg.user_id === userId,
            time: `${date.getHours()}:${minutes}`,
          }

          dispatch(getChatMessageSuccess(msg))
        })

        dispatch(setConnectedSuccess(true))
      })

      connection.on('close', () => {
        setTimeout(() => {
          if (connection.partnerPeer) {
            connection = peer.connect(connection.partnerPeer)
          }
        }, 2000)
      })
    }
  }
}

export const closeWebRtc = () => {
  return (dispatch, getState) => {
    connection.close()
    const state = getState()
    state.rtc.userId = -1
    dispatch(setDisconnectedSuccess(false))
  }
}

export const sendMessage = (message, attachments, audios) => {
  return (dispatch, getState) => {
    const date = new Date()
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`

    const msg1 = {
      name: '',
      msg: {
        attachments: [],
        msg: message,
        audios: [],
      },
      status: 'sent',
      self: true,
      time: `${date.getHours()}:${minutes}`,
    }
    dispatch(getChatMessageSuccess(msg1))
  }
}