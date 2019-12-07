/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-bind */
import React, { useState, useEffect } from 'react'
import styles from '../styles/MessageForm.module.css'
import ChatHeader from './ChatHeader'
import FormInput from './FormInput'
import MessageBubble from './MessageBubble'
import Messenger from './Messenger.Context'

const MessageForm = (props) => {
  const { style, chatInfo, messages } = props

  const [dragActiveState, setDragActiveState] = useState(false)
  const [filesDrag, setFilesDrag] = useState(null)

  const msgList = []

  const resultEnd = React.useRef(null)

  if (typeof messages !== 'undefined' && messages !== null && messages.length > 0) {
    let i = 0
    messages.forEach((msg) => {
      let bubble = <MessageBubble className={styles.message_bubble.them} key={i} msgInfo={msg} />
      if (msg.self) {
        bubble = <MessageBubble className={styles.message_bubble.me} key={i} msgInfo={msg} />
      }

      i += 1
      msgList.push(bubble)
    })
  }

  useEffect(() => {
    const scrollInto = (target) => {
      target.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
    }
    scrollInto(resultEnd)
  })

  const handleDragOver = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setDragActiveState(true)
  }

  const handleDragLeave = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setDragActiveState(false)
  }

  const handleDrop = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setDragActiveState(false)
    setFilesDrag(e.dataTransfer.files)
  }

  return (
    <form
      style={style}
      className={styles.msform}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className={`${styles.drag_n_drop_wrapper} ${dragActiveState && styles.drag_n_drop_active}`}>
        <div className={styles.drag_n_drop}>
          <svg className={styles.file_upload_image} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M464 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM112 120c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56zM64 384h384V272l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L208 320l-55.515-55.515c-4.686-4.686-12.284-4.686-16.971 0L64 336v48z" />
          </svg>
          <span className={styles.drag_n_drop_text}>Переместите изображение для загрузки</span>
        </div>
      </div>
      <Messenger.Consumer>
        {(val) => (
          <ChatHeader
            className={styles.header}
            returnToChatsList={val.returnToChatsList.bind(val)}
            chatInfo={chatInfo}
          />
        )}
      </Messenger.Consumer>
      <div className={styles.result}>
        {msgList}
        <div ref={resultEnd} />
      </div>
      <Messenger.Consumer>
        {(val) => (
          <FormInput
            placeholder="Введите сообщение"
            filesDragAndDrop={[filesDrag, setFilesDrag]}
            messageEntered={val.messageEntered.bind(val)}
          />
        )}
      </Messenger.Consumer>
    </form>
  )
}

export default MessageForm
