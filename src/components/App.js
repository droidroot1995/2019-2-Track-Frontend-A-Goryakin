/* eslint-disable no-alert */
/* eslint-disable class-methods-use-this */

import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import styles from '../styles/App.module.css'
import ChatList from './ChatList'
import MessageForm from './MessageForm'
import Profile from './Profile'
import Messenger from './Messenger.Context'

class App extends React.Component {
  constructor(props) {
    super(props)

    const userInfo = this.getUserInfo()

    this.state = {
      chats: userInfo.chatsList,
      messages: userInfo.messagesList,
      userInfo: userInfo.userInfo,
      selected: null,
      message_form_animation: null,
      chats_list_animation: null,
      profile_page_animation: null,
      isRoot: false,
    }
  }

  getUserInfo() {
    let userInfo = {}
    try {
      const tmpChats = JSON.parse(localStorage.getItem('chats'))
      const tmpMessages = JSON.parse(localStorage.getItem('messages'))
      const tmpUserInfo = JSON.parse(localStorage.getItem('userInfo'))

      userInfo = {
        chatsList: tmpChats === null ? [] : tmpChats,
        messagesList: tmpMessages === null ? {} : tmpMessages,
        userInfo:
          tmpUserInfo === null
            ? { avatar: 'http://pikchyriki.net/avatar/krutye/64/76.jpg', name: '', username: '', bio: '' }
            : tmpUserInfo,
      }
    } catch {
      userInfo = {
        chatsList: [],
        messagesList: {},
        userInfo: { avatar: 'http://pikchyriki.net/avatar/krutye/64/76.jpg', name: '', username: '', bio: '' },
      }
    }

    return userInfo
  }

  addNewChat() {
    const { chats, messages } = this.state

    const cId = chats.length

    const contactName = prompt('Введите имя контакта', 'Новый контакт')

    chats.unshift({
      id: cId,
      avatar: 'http://pikchyriki.net/avatar/krutye/64/76.jpg',
      name: contactName,
      time: '',
      message: '',
      isGroup: false,
      status: '',
    })

    messages[`${cId}`] = []

    localStorage.setItem('chats', JSON.stringify(chats))
    localStorage.setItem('messages', JSON.stringify(messages))

    this.setState({ chats })
  }

  openMessageForm(selectedChatId) {
    const { state } = this

    state.selected = selectedChatId
    state.message_form_animation = {
      animationName: styles.showMessageForm,
    }

    state.profile_page_animation = {
      top: '-100%',
      animationName: styles.hideMessageForm,
    }

    state.chats_list_animation = {
      bottom: '-100%',
    }

    state.isRoot = false

    this.setState(state)
  }

  openProfilePage() {
    const { state } = this

    state.message_form_animation = {
      top: '-100%',
      animationName: styles.hideMessageForm,
    }

    state.profile_page_animation = {
      animationName: styles.showMessageForm,
    }

    state.chats_list_animation = {
      bottom: '-100%',
    }

    state.isRoot = false

    this.setState(state)
  }

  returnToChatsList() {
    const { state } = this
    state.selected = null
    state.message_form_animation = {
      top: '-100%',
      animationName: styles.hideMessageForm,
    }

    state.profile_page_animation = {
      top: '-100%',
      animationName: styles.hideMessageForm,
    }

    state.chats_list_animation = {
      animationName: styles.showChatsList,
    }

    state.isRoot = true
    this.setState(state)
  }

  messageEntered(value) {
    const { selected, messages, chats } = this.state

    const currentDate = new Date()
    const hours = currentDate.getHours()
    const minutes = currentDate.getMinutes()
    const msgTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`

    const chat = chats.filter((val) => val.id === selected)[0]
    const index = chats.indexOf(chat)
    chats.splice(index, 1)

    chat.time = msgTime
    chat.message = value
    chat.status = 'sent'

    chats.unshift(chat)

    messages[`${selected}`].push({
      name: 'Alexander',
      msg: value,
      status: 'sent',
      self: true,
      time: msgTime,
    })

    localStorage.setItem('messages', JSON.stringify(messages))
    localStorage.setItem('chats', JSON.stringify(chats))

    this.setState({ messages })
  }

  saveUserInfo(value) {
    const { userInfo } = this.state
    userInfo.avatar = value.avatar
    userInfo.name = value.name
    userInfo.username = value.username
    userInfo.bio = value.bio

    localStorage.setItem('userInfo', JSON.stringify(userInfo))

    this.setState({ userInfo })
  }

  render() {
    const { state } = this

    return (
      <Messenger.Provider value={this}>
        <div className={styles.container}>
          <Switch>
            <Route path="/profile">
              <Profile style={state.profile_page_animation} userInfo={state.userInfo} />
            </Route>
            <Route path="/chat">
              <MessageForm
                style={state.message_form_animation}
                chatInfo={state.chats.filter((val) => val.id === state.selected)[0]}
                messages={state.messages[`${state.selected}`]}
              />
            </Route>
            <Route path="/list">
              <ChatList style={state.chats_list_animation} chatsList={state.chats} />
            </Route>
            <Redirect to="/list" />
          </Switch>
          {state.isRoot === true ? <Redirect to="/list" /> : null}
        </div>
      </Messenger.Provider>
    )
  }
}

export default App
