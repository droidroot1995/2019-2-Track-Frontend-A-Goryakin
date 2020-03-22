/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */

import React from 'react'
import { connect } from 'react-redux'
import { setEmoji } from '../actions/emoji'
import style from '../styles/Emoji.module.css'

const Emoji = (props) => {
  const { setEmji, name, etype } = props

  const match = name.match(/:(\w+):/g)
  let emName = name
  if (match === null) {
    emName = `:${name}:`
  }

  const handleEmojiClick = () => {
    setEmji(emName)
  }

  const emStyle = style[emName.slice(1, -1)]

  let emji = <span onClick={handleEmojiClick} className={emStyle} />

  if (etype === 'msg') {
    emji = <span className={emStyle} />
  }

  if (etype === 'kbd') {
    emji = <span onClick={handleEmojiClick} className={emStyle} />
  }

  return emji
}

const mapDispatchToProps = (dispatch) => ({
  setEmji: (emoji) => dispatch(setEmoji(emoji)),
})

export default connect(null, mapDispatchToProps)(Emoji)
