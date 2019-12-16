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

export const getChatMessages = (uid, chatId) => {
  return (dispatch, getState) => {
    dispatch(getChatMessagesStarted())
    fetch(`/chats/chat_msg_list?chat_id=${chatId}`)
      .then((respMsg) => respMsg.json())
      .then((msgData) => {
        const msgDat = msgData['messages'].reverse()
        const chatMsgs = []
        for (let j = 0; j < msgDat.length; j += 1) {
          const date = new Date(msgDat[j].added_at)
          const msg = {
            name: uid == msgDat[j].user_id ? '' : '',
            msg: {
              attachments: [],
              msg: msgDat[j].content,
              audios: [],
            },
            status: 'sent',
            self: uid == msgDat[j].user_id,
            time: `${date.getHours()}:${date.getMinutes()}`,
          }

          chatMsgs.push(msg)
        }
        dispatch(getChatMessagesSuccess(chatMsgs))
      })
      .catch((err) => {
        dispatch(getChatMessagesFailure(err.message))
      })
  }
}
