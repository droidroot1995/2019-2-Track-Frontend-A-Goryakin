/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/ChatList.module.css'
import ChatListHeader from './ChatListHeader'
import ChatListItem from './ChatListItem'
import NewChatButton from './NewChatButton'
import Messenger from './Messenger.Context'

const ChatList = (props) => {
  const { style, chatsList } = props

  const chats = []

  let list = (
    <div className={styles.chats_list}>
      Сообщений пока нет. Нажмите на кнопку в правом нижнем углу для создания нового чата.
    </div>
  )

  if (chatsList.length > 0) {
    let i = 0
    chatsList.forEach((chatInfo) => {
      const chat = (
        <Link to={`/chat?id=${chatInfo.id}`} key={i}>
          <ChatListItem chatInfo={chatInfo} />
        </Link>
      )
      i += 1
      chats.push(chat)
    })

    list = <div className={styles.chats_list}>{chats}</div>
  }

  return (
    <div style={style} className={styles.chat_list}>
      <Messenger.Consumer>
        {(val) => <ChatListHeader className={styles.header} openProfilePage={val.openProfilePage.bind(val)} />}
      </Messenger.Consumer>
      {list}
      <Messenger.Consumer>{(val) => <NewChatButton addNewChat={val.addNewChat.bind(val)} />}</Messenger.Consumer>
    </div>
  )
}

export default ChatList
