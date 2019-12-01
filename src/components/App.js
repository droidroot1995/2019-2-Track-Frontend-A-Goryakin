/* eslint-disable object-shorthand */
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

    this.ls_messages = userInfo.messagesList

    this.state = {
      chats: userInfo.chatsList,
      messages: userInfo.messagesList,
      userInfo: userInfo.userInfo,
      selected: null,
      message_form_animation: null,
      chats_list_animation: { animationName: styles.showChatsList },
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
      bottom: '0',
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
      bottom: '0',
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
      bottom: '-100%',
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
    chat.message = value.msg
    chat.status = 'sent'

    chats.unshift(chat)

    if (value.msg !== '' && (value.attachments === [] || value.audios === [])) {
      this.ls_messages[`${selected}`].push({
        name: 'Alexander',
        msg: value.msg,
        status: 'sent',
        self: true,
        time: msgTime,
      })

      localStorage.setItem('messages', JSON.stringify(this.ls_messages))
      localStorage.setItem('chats', JSON.stringify(chats))
    }

    let msg = ''

    msg += `<p className=${styles.message}>${value.msg}</p><br>`

    for (let i = 0; i < value.attachments.length; i += 1) {
      const data = new FormData()

      if (value.attachments[i].type === 'image') {
        msg += `<a href="${value.attachments[i].url}" style="margin-left: 30%;"><img src="${value.attachments[i].url}" width="70px" height="70px"></a><br>`
      } else if (value.attachments[i].type === 'file') {
        msg += `<a href="${value.attachments[i].url}" style="margin-left: 30%;"><svg style="fill: rgb(128, 128, 128); background: #fff; padding: 10px;" width="70px" height="70px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm160-14.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z"/>
          </svg></a><br>`
      } else if (value.attachments[i].type === 'location') {
        msg += `<a href="${value.attachments[i].url}" style="margin-left: 30%;"><svg style="fill: rgb(128, 128, 128); background: #fff; padding: 10px;" width="70px" height="70px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"/>
          </svg></a><br>`
      }

      data.append(value.attachments[i].type, value.attachments[i].src)
      fetch('https://tt-front.now.sh/upload', {
        method: 'POST',
        body: data,
      }).then((resp) => resp.json())
    }

    for (let i = 0; i < value.audios.length; i += 1) {
      msg += `<audio controls src="${value.audios[i].url}"></audio><br>`

      const data = new FormData()

      data.append('audio', value.audios[i].src)
      fetch('https://tt-front.now.sh/upload', {
        method: 'POST',
        body: data,
      }).then((resp) => resp.json())
    }

    messages[`${selected}`].push({
      name: 'Alexander',
      msg: msg,
      status: 'sent',
      self: true,
      time: msgTime,
    })

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
