/* eslint-disable eqeqeq */
/* eslint-disable dot-notation */
import {
  GET_MESSAGES_LIST_REQUEST,
  GET_MESSAGES_LIST_SUCCESS,
  GET_MESSAGES_LIST_FAILURE,
  GET_MESSAGE_SUCCESS,
} from '../constants/ActionTypes'
import { API_URL } from '../constants/constans'

// let subscription = null

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
    // eslint-disable-next-line no-underscore-dangle
    if (!(name in wsocket.socket._subs)) {
      wsocket.socket.subscribe(name, (message) => {
        const state = getState()
        const { userId } = state.profile.profile

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

        const currChatId = Number(name.slice(4))
        // eslint-disable-next-line prefer-destructuring
        const chatId = state.messages.chatId

        if (currChatId === chatId) {
          dispatch(getChatMessageSuccess(msg))
        }
      })
    }
  }
}

export const getChatMessages = (chatId, userId) => {
  return (dispatch, getState) => {
    dispatch(getChatMessagesStarted())
    fetch(`${API_URL}/chats/chat_msg_list?chat_id=${chatId}`)
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
