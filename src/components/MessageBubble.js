/* eslint-disable react/prop-types */
import React from 'react'
import styles from '../styles/MessageBubble.module.css'

const MessageBubble = (props) => {
  const { msgInfo } = props
  const { name, msg, time, self, status } = msgInfo

  let msgStatus = ''
  if (status === 'sent' && self) {
    msgStatus = (
      <svg xmlns="http://www.w3.org/2000/svg" className={styles.sent} viewBox="0 0 512 512">
        <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" />
      </svg>
    )
  } else if (status === 'sent_read' && self) {
    msgStatus = (
      <svg xmlns="http://www.w3.org/2000/svg" className={styles.sent_read} viewBox="0 0 512 512">
        <path d="M505 174.8l-39.6-39.6c-9.4-9.4-24.6-9.4-33.9 0L192 374.7 80.6 263.2c-9.4-9.4-24.6-9.4-33.9 0L7 302.9c-9.4 9.4-9.4 24.6 0 34L175 505c9.4 9.4 24.6 9.4 33.9 0l296-296.2c9.4-9.5 9.4-24.7.1-34zm-324.3 106c6.2 6.3 16.4 6.3 22.6 0l208-208.2c6.2-6.3 6.2-16.4 0-22.6L366.1 4.7c-6.2-6.3-16.4-6.3-22.6 0L192 156.2l-55.4-55.5c-6.2-6.3-16.4-6.3-22.6 0L68.7 146c-6.2 6.3-6.2 16.4 0 22.6l112 112.2z" />
      </svg>
    )
  }

  let messageClass = styles.them

  if (self) {
    messageClass = styles.me
  }

  return (
    <div className={`${styles.message_bubble_container} ${messageClass}`}>
      <div className={`${styles.message_bubble} ${messageClass}`}>
        <div className={styles.txt}>
          <p className={`${styles.name} ${messageClass}`}>{name}</p>
          <p className={styles.message}>{msg}</p>
          <p className={styles.message_info}>
            <span className={`${styles.time}`}>{time}</span>
            {msgStatus}
          </p>
        </div>
        <div className={styles.bubble_arrow} />
      </div>
    </div>
  )
}

export default MessageBubble
