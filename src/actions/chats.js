/* eslint-disable no-alert */
/* eslint-disable dot-notation */
import { GET_CHATS_LIST_REQUEST, GET_CHATS_LIST_SUCCESS, GET_CHATS_LIST_FAILURE } from '../constants/ActionTypes'

const getChatsListStarted = () => ({
  type: GET_CHATS_LIST_REQUEST,
})

const getChatsListSuccess = (chats) => ({
  type: GET_CHATS_LIST_SUCCESS,
  payload: chats,
})

const getChatsListFailure = (error) => ({
  type: GET_CHATS_LIST_FAILURE,
  payload: {
    error,
  },
})

export const getChats = (uid) => {
  return (dispatch, getState) => {
    if (uid > 0) {
      dispatch(getChatsListStarted())

      fetch(`/chats/list_chats?user_id=${uid}`)
        .then((resp) => resp.json())
        .then((data) => {
          const dat = data['chats']
          const chats = []
          for (let i = 0; i < dat.length; i += 1) {
            let msgTime = ''
            fetch(`/chats/chat_msg_list?chat_id=${dat[i].id}`)
              .then((respMsg) => respMsg.json())
              .then((msgData) => {
                const msgs = msgData['messages'].reverse()
                if (msgs.length !== 0) {
                  const date = new Date(msgs[0].added_at)
                  msgTime = `${date.getHours()}:${date.getMinutes()}`
                }
              })

            const chat = {
              id: dat[i].id,
              avatar: 'http://pikchyriki.net/avatar/krutye/64/76.jpg',
              name: dat[i].topic,
              time: msgTime,
              message: dat[i].last_message,
              isGroup: dat[i].is_group,
              status: '',
            }
            chats.push(chat)
          }

          dispatch(getChatsListSuccess(chats))
        })
        .catch((err) => {
          dispatch(getChatsListFailure(err.message))
        })
    }
  }
}
