import React from 'react'
import {
  Smile,
  Angry,
  Alien,
  Screaming,
  Kiss,
  Fear,
  RollingEyes,
  Adult,
  Tongue,
  WithThermometer,
  Monocle,
  OpenMouth,
  Eyebrow,
  Flushed,
  Confused,
  Clown,
  Crying,
  Expressionless,
  Dizzy,
  Vomiting,
} from './Emoji.js'
import styles from '../styles/EmojiKeyboard.module.css'

const EmojiKeyboard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <Smile name=":smile:" />
        <Angry name=":angry:" />
        <Alien name=":alien:" />
        <Screaming name=":screaming:" />
        <Kiss name=":kiss:" />
      </div>
      <div className={styles.row}>
        <Fear name=":fear:" />
        <RollingEyes name=":rolling_eyes:" />
        <Adult name=":adult:" />
        <Tongue name=":tongue:" />
        <WithThermometer name=":with_thermometer:" />
      </div>
      <div className={styles.row}>
        <Monocle name=":monocle:" />
        <OpenMouth name=":open_mouth:" />
        <Eyebrow name=":eyebrow:" />
        <Flushed name=":flushed:" />
        <Confused name=":confused:" />
      </div>
      <div className={styles.row}>
        <Clown name=":clown:" />
        <Crying name=":crying:" />
        <Expressionless name=":expressionless:" />
        <Dizzy name=":dizzy:" />
        <Vomiting name=":vomiting:" />
      </div>
    </div>
  )
}

export default EmojiKeyboard
