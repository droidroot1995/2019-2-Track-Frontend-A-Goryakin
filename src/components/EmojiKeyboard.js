/* eslint-disable react/no-array-index-key */

import React from 'react'
import Emoji from './Emoji.js'
import ErrorBoundary from './ErrorBoundary'
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

  return (
    <ErrorBoundary>
      <div className={styles.container}>
        {emojis.map((entry, idx) => (
          <Emoji etype="kbd" key={idx} name={entry} />
        ))}
      </div>
    </ErrorBoundary>
  )
}

export default EmojiKeyboard
