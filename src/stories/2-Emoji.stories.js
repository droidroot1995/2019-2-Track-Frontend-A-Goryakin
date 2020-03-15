import React from 'react'
import { Provider } from 'react-redux'
import store from '../store/store'
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
} from '../components/Emoji.js'

export default {
  title: 'Emoji',
  component: null,
}

export const Smiling = () => (
  <Provider store={store}>
    <Smile />
    <Angry />
    <Alien />
    <Screaming />
    <Kiss />
    <Fear />
    <RollingEyes />
    <Adult />
    <Tongue />
    <WithThermometer />
    <Monocle />
    <OpenMouth />
    <Eyebrow />
    <Flushed />
    <Confused />
    <Clown />
    <Crying />
    <Expressionless />
    <Dizzy />
    <Vomiting />
  </Provider>
)
