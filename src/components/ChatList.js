/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
import React from 'react'
import styles from '../styles/ChatList.module.css'
import ChatListHeader from './ChatListHeader'
import ChatListItem from './ChatListItem'
import NewChatButton from './NewChatButton'
import Messenger from './Messenger.Context'

const ChatList = (props) => {

    const {chatsList} = props

    const chats = []

    let list = <div className={styles.chats_list}>Сообщений пока нет. Нажмите на кнопку в правом нижнем углу для создания нового чата.</div>

    if(chatsList.length > 0){

        let i = 0
        chatsList.forEach((chatInfo) => {
            const chat = <ChatListItem key={i} chatInfo={chatInfo}/>
            i += 1
            chats.push(chat)
        })

        list = <div className={styles.chats_list}>{chats}</div>
    }

    return (
        <div className={styles.chat_list}>
            <ChatListHeader className={styles.header}/>
            {list}
            <Messenger.Consumer>
                {(val) => (
                    <NewChatButton addNewChat={val.addNewChat.bind(val)}/>
                )}
            </Messenger.Consumer>
        </div>
    )
}

export default ChatList