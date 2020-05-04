/* eslint-disable react/no-array-index-key */
/* eslint-disable eqeqeq */
/* eslint-disable consistent-return */
/* eslint-disable dot-notation */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-bind */
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { closeWebRtc, setRtcUserId, connectWebRtc } from '../actions/rtc'
import styles from '../styles/MessageForm.module.css'
import ChatHeader from './ChatHeader'
import FormInputRtc from './FormInputRtc'
import MessageBubble from './MessageBubble'
import ErrorBoundary from './ErrorBoundary'

const MessageFormRtc = ({ selected, messages, userId, connection, chatInfo, connWRtc, closeWRtc, setRtcUid }) => {
  const [dragActiveState, setDragActiveState] = useState(false)
  const [filesDrag, setFilesDrag] = useState(null)
  const [chatMessages, setChatMessages] = useState([])

  useEffect(() => {
    if (connection) {
      connWRtc(connection)
    } else {
      setRtcUid()
    }
  }, [connWRtc, closeWRtc, setRtcUid, selected, userId, messages, connection])

  let msgList = []

  const resultEnd = React.useRef(null)

  if (messages && messages.length > 0) {
    msgList = messages.map((msg, idx) => {
      return <MessageBubble className={styles[msg.self ? 'me' : 'them']} key={idx} msgInfo={msg} />
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
    <ErrorBoundary>
      <form className={styles.msform} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
        <div className={`${styles.drag_n_drop_wrapper} ${dragActiveState && styles.drag_n_drop_active}`}>
          <div className={styles.drag_n_drop}>
            <svg className={styles.file_upload_image} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M464 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM112 120c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56zM64 384h384V272l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L208 320l-55.515-55.515c-4.686-4.686-12.284-4.686-16.971 0L64 336v48z" />
            </svg>
            <span className={styles.drag_n_drop_text}>Переместите изображение для загрузки</span>
          </div>
        </div>
        <ChatHeader className={styles.header} chatInfo={chatInfo} />
        <div className={styles.result}>
          {msgList}
          <div ref={resultEnd} />
        </div>
        <FormInputRtc placeholder="Введите сообщение" filesDragAndDrop={[filesDrag, setFilesDrag]} />
      </form>
    </ErrorBoundary>
  )
}

const mapStateToProps = (state) => ({
  selected: state.rtc.connectId,
  messages: state.rtc.messages,
  connection: state.rtc.connection,
  userId: state.rtc.userId,
})

const mapDispatchToProps = (dispatch) => ({
  connWRtc: (conn) => dispatch(connectWebRtc(conn)),
  closeWRtc: (sel) => dispatch(closeWebRtc(sel)),
  setRtcUid: (uid) => dispatch(setRtcUserId(uid)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MessageFormRtc)
