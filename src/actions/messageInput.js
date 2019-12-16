/* eslint-disable dot-notation */
import { SEND_MESSAGE_REQUEST, SEND_MESSAGE_SUCCESS, SEND_MESSAGE_FAILURE } from '../constants/ActionTypes'

const sendMessageStarted = () => ({
  type: SEND_MESSAGE_REQUEST,
})

const sendMessageSuccess = (status) => ({
  type: SEND_MESSAGE_SUCCESS,
  payload: status,
})

const sendMessageFailure = (error) => ({
  type: SEND_MESSAGE_FAILURE,
  payload: {
    error,
  },
})

export const sendMessage = (uid, chatId, message, attachments, audios) => {
  return (dispatch, getState) => {
    const currentDate = new Date()
    const hours = currentDate.getHours()
    const minutes = currentDate.getMinutes()
    const msgTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`

    const msg = {}
    msg.user = uid
    msg.chat = chatId
    msg.content = message
    msg.added_at = msgTime

    const data = new FormData()
    data.append('user', uid)
    data.append('chat', chatId)
    data.append('content', message)
    data.append('added_at', msgTime)

    dispatch(sendMessageStarted())

    fetch(`/chats/send_msg`, { method: 'POST', body: data })
      .then((resp) => resp.json())
      .then((dat) => {
        for (let i = 0; i < attachments.length; i += 1) {
          if (attachments[i].type !== 'location') {
            const attData = new FormData()
            attData.append('chat', chatId)
            attData.append('user', uid)
            attData.append('message', dat['message']['id'])
            attData.append('att_type', attachments[i].type)
            attData.append('url', attachments[i].src)
            fetch('/chats/upload', { method: 'POST', body: attData }).then((resp) => resp.json())
          }
        }

        for (let i = 0; i < audios.length; i += 1) {
          const audioData = new FormData()
          audioData.append('chat', chatId)
          audioData.append('user', uid)
          audioData.append('message', dat['message']['id'])
          audioData.append('att_type', attachments[i].type)
          audioData.append('url', attachments[i].src)
          fetch('/chats/upload', { method: 'POST', body: audioData }).then((resp) => resp.json())
        }

        dispatch(sendMessageSuccess(dat))
      })
      .catch((err) => dispatch(sendMessageFailure(err.message)))
  }
}
