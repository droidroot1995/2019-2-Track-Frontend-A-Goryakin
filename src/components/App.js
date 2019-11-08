/* eslint-disable class-methods-use-this */
import React from 'react'
import styles from '../styles/App.module.css'
import ChatList from './ChatList'
import MessageForm from './MessageForm'
import Messenger from './Messenger.Context'

class App extends React.Component {

    constructor(props) {
        super(props)

        const userInfo = this.getUserInfo()

        this.state = {
            chats: userInfo.chatsList,
            messages: userInfo.messagesList,
            selected: null,
            message_form_animation: null,
        }

    }

    getUserInfo() {
        let userInfo = {}
        try {

            const tmpChats =  JSON.parse(localStorage.getItem('chats'))
            const tmpMessages = JSON.parse(localStorage.getItem('messages'))

            userInfo = {
                chatsList: tmpChats === null ? [] : tmpChats,
                messagesList: tmpMessages === null ? {} : tmpMessages,
            }
        }
        catch {
            userInfo = {
                chatsList: [],
                messagesList: {},
            }
        }

        return userInfo
    }

    addNewChat() {
        const {chats, messages} = this.state

        const cId = chats.length

        chats.unshift({
            id: cId,
            avatar: 'http://pikchyriki.net/avatar/krutye/64/76.jpg',
            name:'Новый контакт',
            time:'',
            message:'',
            isGroup: false,
            status: ''
        })

        messages[`${cId}`] = []

        localStorage.setItem('chats', JSON.stringify(chats))
        localStorage.setItem(('messages'), JSON.stringify(messages))

        this.setState({chats})
    }

    openMessageForm(selectedChatId){
        const {state} = this

        state.selected = selectedChatId
        state.message_form_animation = {
            animationName: styles.showMessageForm,
        }

        this.setState(state)
    }

    returnToChatsList() {
        const {state} = this
        state.selected = null
        state.message_form_animation = {
            animationName: styles.hideMessageForm,
        }
        this.setState(state)

    }

    messageEntered(value) {
        const {selected, messages, chats} = this.state

        const currentDate = new Date()
        const hours = currentDate.getHours()
        const minutes = currentDate.getMinutes()
        const msgTime = `${hours}:${((minutes  < 10) ? '0' : '')}${minutes}`

        const chat = chats.filter(val => val.id === selected)[0]
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
            time: msgTime
        })

        localStorage.setItem('messages', JSON.stringify(messages))
        localStorage.setItem('chats', JSON.stringify(chats))

        this.setState({messages})
    }

    render() {

        const {state} = this

        return(
            <Messenger.Provider value={this}>
                <div className="container">
                    <ChatList
                        chatsList={state.chats}
                    />
                    <MessageForm 
                        style={state.message_form_animation}
                        chatInfo = {state.chats.filter(val => val.id === state.selected)[0]}
                        messages = {state.messages[`${state.selected}`]}
                    />
                </div>
            </Messenger.Provider>
        )
    }
}

export default App