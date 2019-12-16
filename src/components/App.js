/* eslint-disable dot-notation */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/control-has-associated-label */
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
      userId: 0,
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

  componentDidMount() {
    const { state } = this
    const userId = prompt('Enter your id', 0)

    if (userId !== null && userId > 0) {
      setInterval(() => this.getChats(), 500)
      state.userId = userId
      this.setState(state)
      this.getChats()
    }
  }

  getChats() {
    const { state } = this
    if (state.userId > 0) {
      fetch(`/chats/list_chats?user_id=${state.userId}`)
        .then((resp) => resp.json())
        .then((data) => {
          const dat = data['chats']
          const chats = []
          const messages = {}
          for (let i = 0; i < dat.length; i += 1) {
            let msgTime = ''
            fetch(`/chats/chat_msg_list?chat_id=${dat[i].id}`)
              .then((respMsg) => respMsg.json())
              .then((msgData) => {
                const msgs = msgData['messages'].reverse()
                if (msgs.length !== 0) {
                  const date = new Date(msgs[0].added_at)
                  msgTime = `${date.getHours()}:${date.getMinutes()}`
                }
              })

            const chat = {
              id: dat[i].id,
              avatar: 'http://pikchyriki.net/avatar/krutye/64/76.jpg',
              name: dat[i].topic,
              time: msgTime,
              message: dat[i].last_message,
              isGroup: dat[i].is_group,
              status: '',
            }
            chats.push(chat)
          }

          state.chats = chats
          state.messages = messages
          this.setState(state)
        })
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
    const { userId } = this.state

    const contactId = prompt('Введите id контакта', 0)

    if (contactId > 0 && contactId !== userId) {
      const data = new FormData()
      data.append('user_id', userId)
      data.append('target_user_id', contactId)

      fetch(`/chats/create_pers_chat`, { method: 'POST', body: data }).then((resp) => resp.json())
    }
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
    const { selected, userId } = this.state

    const currentDate = new Date()
    const hours = currentDate.getHours()
    const minutes = currentDate.getMinutes()
    const msgTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`

    const msg = {}
    msg.user = userId
    msg.chat = selected
    msg.content = value.msg
    msg.added_at = msgTime

    const data = new FormData()
    data.append('user', userId)
    data.append('chat', selected)
    data.append('content', value.msg)
    data.append('added_at', msgTime)

    fetch(`/chats/send_msg`, { method: 'POST', body: data })
      .then((resp) => resp.json())
      .then((dat) => {
        for (let i = 0; i < value.attachments.length; i += 1) {
          if (value.attachments[i].type !== 'location') {
            const attData = new FormData()
            attData.append('chat', selected)
            attData.append('user', userId)
            attData.append('message', dat['message']['id'])
            attData.append('att_type', value.attachments[i].type)
            attData.append('url', value.attachments[i].src)
            fetch('/chats/upload', { method: 'POST', body: attData }).then((resp) => resp.json())
          }
        }

        for (let i = 0; i < value.audios.length; i += 1) {
          const audioData = new FormData()
          audioData.append('chat', selected)
          audioData.append('user', userId)
          audioData.append('message', dat['message']['id'])
          audioData.append('att_type', value.attachments[i].type)
          audioData.append('url', value.attachments[i].src)
          fetch('/chats/upload', { method: 'POST', body: audioData }).then((resp) => resp.json())
        }
      })
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
              <Profile style={state.profile_page_animation} userId={state.userId} />
            </Route>
            <Route path="/chat">
              <MessageForm
                style={state.message_form_animation}
                userId={state.userId}
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
