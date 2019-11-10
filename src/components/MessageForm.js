/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-bind */
import React from 'react'
import styles from '../styles/MessageForm.module.css'
import ChatHeader from './ChatHeader'
import FormInput from './FormInput'
import MessageBubble from './MessageBubble'
import Messenger from './Messenger.Context'

const MessageForm = (props) => {

    const{style, chatInfo, messages} = props

    const msgList = []

    if(typeof messages !== 'undefined' && messages !== null && messages.length > 0) {
        let i = 0
        messages.forEach((msg) => {
            
            let bubble = <MessageBubble className={styles.message_bubble.them} key={i} msgInfo={msg}/>
            if(msg.self) {
                bubble = <MessageBubble className={styles.message_bubble.me} key={i} msgInfo={msg}/>
            }

            i += 1
            msgList.push(bubble)
        })
    }
    


    return (
        <form style={style} className={styles.msform}>
            <Messenger.Consumer>
                {(val) => (
                    <ChatHeader 
                        className={styles.header}
                        returnToChatsList={val.returnToChatsList.bind(val)}
                        chatInfo={chatInfo}
                    />
                )}
            </Messenger.Consumer>
            <div className={styles.result}>{msgList}</div>
            <Messenger.Consumer>
                {(val) => (
                    <FormInput
                        placeholder="Введите сообщение"
                        messageEntered={val.messageEntered.bind(val)}
                    />
                )}
            </Messenger.Consumer>
        </form>
    )
}

export default MessageForm