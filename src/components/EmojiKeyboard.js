/* eslint-disable no-plusplus */
import React from 'react'
import Emoji from './Emoji.js'
import styles from '../styles/EmojiKeyboard.module.css'

const EmojiKeyboard = () => {
  const emojis = [
    ':smile:',
    ':angry:',
    ':alien:',
    ':screaming:',
    ':kiss:',
    ':fear:',
    ':rolling_eyes:',
    ':adult:',
    ':tongue:',
    ':with_thermometer:',
    ':monocle:',
    ':open_mouth:',
    ':eyebrow:',
    ':flushed:',
    ':confused:',
    ':clown:',
    ':crying:',
    ':expressionless:',
    ':dizzy:',
    ':vomiting:',
  ]

  let k = 0

  return (
    <div className={styles.container}>
      {emojis.map((entry) => (
        <Emoji etype="kbd" key={k++} name={entry} />
      ))}
    </div>
  )
}

export default EmojiKeyboard
