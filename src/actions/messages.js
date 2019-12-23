/* eslint-disable eqeqeq */
/* eslint-disable dot-notation */
import {
  GET_MESSAGES_LIST_REQUEST,
  GET_MESSAGES_LIST_SUCCESS,
  GET_MESSAGES_LIST_FAILURE,
} from '../constants/ActionTypes'

const getChatMessagesStarted = () => ({
  type: GET_MESSAGES_LIST_REQUEST,
})

const getChatMessagesSuccess = (messages) => ({
  type: GET_MESSAGES_LIST_SUCCESS,
  payload: messages,
})

const getChatMessagesFailure = (error) => ({
  type: GET_MESSAGES_LIST_FAILURE,
  payload: {
    error,
  },
})

export const getChatMessages = (chatId) => {
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
            self: msgd.self,
            time: `${date.getHours()}:${minutes}`,
          }

          chatMsgs.push(msg)
        })
        dispatch(getChatMessagesSuccess(chatMsgs))
      })
      .catch((err) => {
        dispatch(getChatMessagesFailure(err.message))
      })
  }
}
