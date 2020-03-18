import React from 'react'
import Emoji from './Emoji.js'
import styles from '../styles/EmojiKeyboard.module.css'

const EmojiKeyboard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <Emoji name=":smile:" />
        <Emoji name=":angry:" />
        <Emoji name=":alien:" />
        <Emoji name=":screaming:" />
        <Emoji name=":kiss:" />
      </div>
      <div className={styles.row}>
        <Emoji name=":fear:" />
        <Emoji name=":rolling_eyes:" />
        <Emoji name=":adult:" />
        <Emoji name=":tongue:" />
        <Emoji name=":with_thermometer:" />
      </div>
      <div className={styles.row}>
        <Emoji name=":monocle:" />
        <Emoji name=":open_mouth:" />
        <Emoji name=":eyebrow:" />
        <Emoji name=":flushed:" />
        <Emoji name=":confused:" />
      </div>
      <div className={styles.row}>
        <Emoji name=":clown:" />
        <Emoji name=":crying:" />
        <Emoji name=":expressionless:" />
        <Emoji name=":dizzy:" />
        <Emoji name=":vomiting:" />
      </div>
    </div>
  )
}

export default EmojiKeyboard
