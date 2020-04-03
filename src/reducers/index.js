import { combineReducers } from 'redux'
import chats from './chats'
import emoji from './emoji'
import global from './global'
import messages from './messages'
import newChat from './newChat'
import profile from './profile'
import messageInput from './messageInput'
import centrifugo from './centrifugo'
import rtc from './rtc'

const rootReducer = combineReducers({
  chats,
  emoji,
  global,
  messages,
  newChat,
  profile,
  messageInput,
  centrifugo,
  rtc,
})

export default rootReducer
