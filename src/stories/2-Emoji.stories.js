import React from 'react'
import { Provider } from 'react-redux'
import store from '../store/store'
import Emoji from '../components/Emoji.js'

export default {
  title: 'Emoji',
  component: null,
}

export const Smiling = () => (
  <Provider store={store}>
    <Emoji name=":smile:" />
    <Emoji name=":angry:" />
    <Emoji name=":alien:" />
    <Emoji name=":screaming:" />
    <Emoji name=":kiss:" />
    <Emoji name=":fear:" />
    <Emoji name=":rolling_eyes:" />
    <Emoji name=":adult:" />
    <Emoji name=":tongue:" />
    <Emoji name=":with_thermometer:" />
    <Emoji name=":monocle:" />
    <Emoji name=":open_mouth:" />
    <Emoji name=":eyebrow:" />
    <Emoji name=":flushed:" />
    <Emoji name=":confused:" />
    <Emoji name=":clown:" />
    <Emoji name=":crying:" />
    <Emoji name=":expressionless:" />
    <Emoji name=":dizzy:" />
    <Emoji name=":vomiting:" />
  </Provider>
)
