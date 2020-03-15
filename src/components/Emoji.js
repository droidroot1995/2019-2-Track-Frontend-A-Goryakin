/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { connect } from 'react-redux'
import { setEmoji } from '../actions/emoji'
import style from '../styles/Emoji.module.css'

const SmileEmoji = (props) => {
  const { setEmji } = props

  const handleEmojiClick = () => {
    setEmji(':smile:')
  }

  return <div name=":smile:" onClick={handleEmojiClick} className={style.smile} />
}

const AngryEmoji = (props) => {
  const { setEmji } = props

  const handleEmojiClick = () => {
    setEmji(':angry:')
  }

  return <div name=":angry:" onClick={handleEmojiClick} className={style.angry} />
}

const AlienEmoji = (props) => {
  const { setEmji } = props

  const handleEmojiClick = () => {
    setEmji(':alien:')
  }

  return <div name=":alien:" onClick={handleEmojiClick} className={style.alien} />
}

const ScreamingEmoji = (props) => {
  const { setEmji } = props

  const handleEmojiClick = () => {
    setEmji(':screaming:')
  }

  return <div name=":screaming:" onClick={handleEmojiClick} className={style.screaming} />
}

const KissEmoji = (props) => {
  const { setEmji } = props

  const handleEmojiClick = () => {
    setEmji(':kiss:')
  }

  return <div name=":kiss:" onClick={handleEmojiClick} className={style.kiss} />
}

const FearEmoji = (props) => {
  const { setEmji } = props

  const handleEmojiClick = () => {
    setEmji(':fear:')
  }

  return <div name=":fear:" onClick={handleEmojiClick} className={style.fear} />
}

const RollingEyesEmoji = (props) => {
  const { setEmji } = props

  const handleEmojiClick = () => {
    setEmji(':rolling_eyes:')
  }

  return <div name=":rolling_eyes:" onClick={handleEmojiClick} className={style.rolling_eyes} />
}

const AdultEmoji = (props) => {
  const { setEmji } = props

  const handleEmojiClick = () => {
    setEmji(':adult:')
  }

  return <div name=":adult:" onClick={handleEmojiClick} className={style.adult} />
}

const TongueEmoji = (props) => {
  const { setEmji } = props

  const handleEmojiClick = () => {
    setEmji(':tongue:')
  }

  return <div name=":tongue:" onClick={handleEmojiClick} className={style.tongue} />
}

const WithThermometerEmoji = (props) => {
  const { setEmji } = props

  const handleEmojiClick = () => {
    setEmji(':with_thermometer:')
  }

  return <div name=":with_thermometer:" onClick={handleEmojiClick} className={style.with_thermometer} />
}

const MonocleEmoji = (props) => {
  const { setEmji } = props

  const handleEmojiClick = () => {
    setEmji(':monocle:')
  }

  return <div name=":monocle:" onClick={handleEmojiClick} className={style.monocle} />
}

const OpenMouthEmoji = (props) => {
  const { setEmji } = props

  const handleEmojiClick = () => {
    setEmji(':open_mouth:')
  }

  return <div name=":open_mouth:" onClick={handleEmojiClick} className={style.open_mouth} />
}

const EyebrowEmoji = (props) => {
  const { setEmji } = props

  const handleEmojiClick = () => {
    setEmji(':eyebrow:')
  }

  return <div name=":eyebrow:" onClick={handleEmojiClick} className={style.eyebrow} />
}

const FlushedEmoji = (props) => {
  const { setEmji } = props

  const handleEmojiClick = () => {
    setEmji(':flushed:')
  }

  return <div name=":flushed:" onClick={handleEmojiClick} className={style.flushed} />
}

const ConfusedEmoji = (props) => {
  const { setEmji } = props

  const handleEmojiClick = () => {
    setEmji(':confused:')
  }

  return <div name=":confused:" onClick={handleEmojiClick} className={style.confused} />
}

const ClownEmoji = (props) => {
  const { setEmji } = props

  const handleEmojiClick = () => {
    setEmji(':clown:')
  }

  return <div name=":clown:" onClick={handleEmojiClick} className={style.clown} />
}

const CryingEmoji = (props) => {
  const { setEmji } = props

  const handleEmojiClick = () => {
    setEmji(':crying:')
  }

  return <div name=":crying:" onClick={handleEmojiClick} className={style.crying} />
}

const ExpressionlessEmoji = (props) => {
  const { setEmji } = props

  const handleEmojiClick = () => {
    setEmji(':expressionless:')
  }

  return <div name=":expressionless:" onClick={handleEmojiClick} className={style.expressionless} />
}

const DizzyEmoji = (props) => {
  const { setEmji } = props

  const handleEmojiClick = () => {
    setEmji(':dizzy:')
  }

  return <div name=":dizzy:" onClick={handleEmojiClick} className={style.dizzy} />
}

const VomitingEmoji = (props) => {
  const { setEmji } = props

  const handleEmojiClick = () => {
    setEmji(':vomiting:')
  }

  return <div name=":vomiting:" onClick={handleEmojiClick} className={style.vomiting} />
}

const mapDispatchToProps = (dispatch) => ({
  setEmji: (emoji) => dispatch(setEmoji(emoji)),
})

export const Smile = connect(null, mapDispatchToProps)(SmileEmoji)
export const Angry = connect(null, mapDispatchToProps)(AngryEmoji)
export const Alien = connect(null, mapDispatchToProps)(AlienEmoji)
export const Screaming = connect(null, mapDispatchToProps)(ScreamingEmoji)
export const Kiss = connect(null, mapDispatchToProps)(KissEmoji)
export const Fear = connect(null, mapDispatchToProps)(FearEmoji)
export const RollingEyes = connect(null, mapDispatchToProps)(RollingEyesEmoji)
export const Adult = connect(null, mapDispatchToProps)(AdultEmoji)
export const Tongue = connect(null, mapDispatchToProps)(TongueEmoji)
export const WithThermometer = connect(null, mapDispatchToProps)(WithThermometerEmoji)
export const Monocle = connect(null, mapDispatchToProps)(MonocleEmoji)
export const OpenMouth = connect(null, mapDispatchToProps)(OpenMouthEmoji)
export const Eyebrow = connect(null, mapDispatchToProps)(EyebrowEmoji)
export const Flushed = connect(null, mapDispatchToProps)(FlushedEmoji)
export const Confused = connect(null, mapDispatchToProps)(ConfusedEmoji)
export const Clown = connect(null, mapDispatchToProps)(ClownEmoji)
export const Crying = connect(null, mapDispatchToProps)(CryingEmoji)
export const Expressionless = connect(null, mapDispatchToProps)(ExpressionlessEmoji)
export const Dizzy = connect(null, mapDispatchToProps)(DizzyEmoji)
export const Vomiting = connect(null, mapDispatchToProps)(VomitingEmoji)
