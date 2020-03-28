/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getChats } from '../actions/chats'
import { getGlobal } from '../actions/global'
import { getToken } from '../actions/centrifugo'
import { clearRtcUserId, closeWebRtc } from '../actions/rtc'
import styles from '../styles/ChatList.module.css'
import ChatListHeader from './ChatListHeader'
import ChatListItem from './ChatListItem'
import NewChatButton from './NewChatButton'

const ChatList = (props) => {
  const { chatsList, token, rtcUid, getChatsList, setGState, getCToken, clearRtcUid, closeWRtc } = props

  const chats = []

  useEffect(() => {
    if (chatsList.length === 0) {
      getChatsList()
    }

    /* if (rtcUid !== -1) {
      closeWRtc()
    } */

    if (token === '') {
      getCToken()
    }

    const interval = setInterval(() => getChatsList(), 10000)
    return () => {
      clearInterval(interval)
    }
  }, [getChatsList, clearRtcUid, closeWRtc, token, rtcUid])

  let list = (
    <div className={styles.chats_list}>
      Сообщений пока нет. Нажмите на кнопку в правом нижнем углу для создания нового чата.
    </div>
  )

  if (chatsList.length > 0) {
    let i = 0
    chatsList.forEach((chatInfo) => {
      const chat = (
        <Link to={`/chat?id=${chatInfo.id}`} key={i} name={`${chatInfo.id}`} onClick={() => setGState(chatInfo.id)}>
          <ChatListItem chatInfo={chatInfo} />
        </Link>
      )
      i += 1
      chats.push(chat)
    })

    list = <div className={styles.chats_list}>{chats}</div>
  }

  return (
    <div className={styles.chat_list}>
      <ChatListHeader className={styles.header} />
      {list}
      <NewChatButton />
    </div>
  )
}

const mapStateToProps = (state) => ({
  chatsList: state.chats.chats,
  token: state.centrifugo.token,
  rtcUid: state.rtc.userId,
  userId: state.profile.userId,
})

const mapDispatchToProps = (dispatch) => ({
  getChatsList: () => dispatch(getChats()),
  setGState: (chatId) => dispatch(getGlobal(chatId)),
  getCToken: () => dispatch(getToken()),
  clearRtcUid: () => dispatch(clearRtcUserId()),
  closeWRtc: () => dispatch(closeWebRtc()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatList)
