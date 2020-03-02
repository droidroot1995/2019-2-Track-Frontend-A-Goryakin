/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getChats } from '../actions/chats'
import { getGlobal } from '../actions/global'
import styles from '../styles/ChatList.module.css'
import ChatListHeader from './ChatListHeader'
import ChatListItem from './ChatListItem'
import NewChatButton from './NewChatButton'

const ChatList = (props) => {
  const { chatsList, getChatsList, setGState } = props

  const chats = []

  useEffect(() => {
    const interval = setInterval(() => getChatsList(), 500)

    return () => {
      clearInterval(interval)
    }
  }, [getChatsList])

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
})

const mapDispatchToProps = (dispatch) => ({
  getChatsList: () => dispatch(getChats()),
  setGState: (chatId) => dispatch(getGlobal(chatId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatList)
