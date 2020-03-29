/* eslint-disable eqeqeq */
/* eslint-disable dot-notation */
import {
  GET_MESSAGES_LIST_REQUEST,
  GET_MESSAGES_LIST_SUCCESS,
  GET_MESSAGES_LIST_FAILURE,
  GET_MESSAGE_SUCCESS,
} from '../constants/ActionTypes'

let subscription = null

const getChatMessagesStarted = () => ({
  type: GET_MESSAGES_LIST_REQUEST,
})

const getChatMessagesSuccess = (msgs, cid) => ({
  type: GET_MESSAGES_LIST_SUCCESS,
  payload: {
    messages: msgs,
    chatId: cid,
  },
})

const getChatMessageSuccess = (messages) => ({
  type: GET_MESSAGE_SUCCESS,
  payload: messages,
})

const getChatMessagesFailure = (error) => ({
  type: GET_MESSAGES_LIST_FAILURE,
  payload: {
    error,
  },
})

export const subscribeChannel = (name, wsocket) => {
  return (dispatch, getState) => {
    const state = getState()

    const { userId } = state.profile.profile

    subscription = wsocket.socket.subscribe(name, (message) => {
      // console.log(message.data.message)

      const recvMsg = message.data.message

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
  }
}

export const unsubscribeChannel = () => {
  return (dispatch, getState) => {
    subscription.unsubscribe()
    subscription.removeAllListeners()
    subscription = null
  }
}

export const getChatMessages = (chatId, userId) => {
  return (dispatch, getState) => {
    dispatch(getChatMessagesStarted())
    fetch(`/chats/chat_msg_list?chat_id=${chatId}`)
      .then((respMsg) => respMsg.json())
      .then((msgData) => {
        const msgDat = msgData['messages'].reverse()
        const chatMsgs = []
        msgDat.forEach((msgd, idx) => {
          const date = new Date(msgd.added_at)
          const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`

          const msg = {
            name: '',
            msg: {
              attachments: [],
              msg: msgd.content,
              audios: [],
            },
            status: 'sent',
            self: msgd.user_id === userId,
            time: `${date.getHours()}:${minutes}`,
          }

          chatMsgs.push(msg)
        })
        dispatch(getChatMessagesSuccess(chatMsgs, chatId))
      })
      .catch((err) => {
        dispatch(getChatMessagesFailure(err.message))
      })
  }
}
