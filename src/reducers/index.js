import { combineReducers } from 'redux'
import chats from './chats'
import global from './global'
import messages from './messages'
import newChat from './newChat'
import profile from './profile'
import messageInput from './messageInput'

const rootReducer = combineReducers({
  chats,
  global,
  messages,
  newChat,
  profile,
  messageInput,
})

export default rootReducer
