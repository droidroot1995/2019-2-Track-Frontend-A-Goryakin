const template = document.createElement('template')
template.innerHTML = `
    <style>
        form {
            display: flex;
            flex: 1 1 auto;
            flex-direction: column;

            height: 100%;
            background: #FFFFFF;
            overflow-x: hidden;
            overflow-y: hidden;
        }

        .message-input{
            display: flex;

            flex: 1 1 5%;
            flex-direction: row;
        }

        .header {
            flex: 1 1 auto;
            background: #8E24AA; 
            height: 13vh;

            min-height: 100px;

            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }

        form-input {
            display: flex;
            height: 5vh;

            flex: 1 1 5%;
        }

        .result {

            padding: .5em;
            display: flex;

            flex-direction: column;
            flex-flow: column wrap;
            flex: 1 1 90%;
            flex-wrap: nowrap;

            overflow-y: auto;
            overflow-x: hidden;

            justify-content: flex-start;
            flex-grow: 1;

            height: 82vh;
        }

        input[type=submit] {
            visibility: collapse;
        }

        message-bubble {
            align-self: flex-start;
        }

        message-bubble.them {
            align-self: flex-start;
            animation-duration: 0.5s;
            animation-name: mb_them;
        }

        message-bubble.me {
            align-self: flex-end;
            animation-duration: 0.5s; 
            animation-name: mb_me;
        }

        @keyframes mb_me {
            from {
                margin-right: -300px;
                width: 300%;
            }

            to {
                margin-right: 0px;
                width: auto;
            }
        }

        @keyframes mb_them {
            0% {
                margin-left: -300px;
                width: 0%;
            }

            100% {
                margin-left: 0px;
                width: auto;
            }
        }

        @media screen and (max-width: 389px) {
            .header {
                min-height: 90px;
                max-height: 90px;
            }

            form-input {
                min-height: 50px;
            }
        }

        @media screen and (min-width: 390px) and (max-width: 480px) {
            .header {
                min-height: 90px;
                max-height: 90px;
            }

            form-input {
                min-height: 50px;
            }
        }

        @media screen and (min-width: 481px) and (max-width: 767px) {
            .header {
                min-height: 90px;
                max-height: 90px;
            }

            form-input {
                min-height: 50px;
            }
        }

        @media screen and (min-width: 768px) and (max-width: 991px) {

            .header {
                min-height: 90px;
            }

            form-input {
                min-height: 50px;
            }
        }

        @media screen and (min-width: 992px) and (max-width: 1199px) {
            .header {
                min-height: 90px;
            }

            form-input {
                min-height: 50px;
            }
        }

        @media screen and (min-width: 1200px) {
            .header {
                min-height: 100px;
            }

            form-input {
                min-height: 50px;
            }
        }

    </style>
    <form>
        <chat-header class="header"></chat-header>
        <div class="result"></div>
        <form-input name="message-text" placeholder="Введите сообщение"></form-input>
    </form>
`

class MessageForm extends HTMLElement {
    constructor () {
        super()
        this.shadowRoot = this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template.content.cloneNode(true))
        this.$form = this.shadowRoot.querySelector('form')
        this.$input = this.shadowRoot.querySelector('form-input')
        this.$message = this.shadowRoot.querySelector('.result')
        this.$header = this.shadowRoot.querySelector('.header')

        this.$form.addEventListener('submit', this.onSubmit.bind(this))
        this.$form.addEventListener('keypress', this.onKeyPress.bind(this))

        this.messages = []
    }

    loadMessages(){
        const serialized = localStorage.getItem(this.lsChatId)

        if(serialized !== null){
            this.messages = JSON.parse(serialized)

            for(let i = 0; i < this.messages.length; i+=1){
                const msg = this.messages[i]
                const message = document.createElement('message-bubble')
                this.$message.appendChild(message)
                message.className += (` ${msg.className}`)
                message.Classname = msg.className
                message.Name = msg.name
                message.Message = msg.message
                message.Time = msg.time
                message.Status = msg.status
                message.scrollIntoView()
            }
        }
    }

    set chatInfo(info) {

        this.$header.contactAvatar = info.avatar
        this.$header.contactName = info.name
        this.lsChatId = `chat_${info.chatId}`
        this.$message.innerHTML = ''

        this.messages = []

        if(localStorage.getItem(this.lsChatId) == null){
            if(info.name !== 'New contact'){
                const msg = {}
                const message = document.createElement('message-bubble')
                if((info.msg_check === 'sent')  || (info.msg_check === 'sent_read')) {
                    message.className += ' me'
                    message.Classname = 'me'
                    message.Name = 'Alexander'
                    message.Status = info.msg_check
                    msg.name = 'Alexander'
                    msg.className = 'me'
                    msg.status = info.msg_check
                }
                else {
                    message.className += ' them'
                    message.Classname = 'them'
                    message.Name = info.name
                    message.Status = ''
                    msg.name = info.name
                    msg.className = 'them'
                    msg.status = ''
                }

                message.Message = info.msg
                msg.message = info.msg

                message.Time = info.time
                msg.time = info.time

                this.$message.appendChild(message)
                this.messages.push(msg)

                message.scrollIntoView()

                const serialized = JSON.stringify(this.messages)
                localStorage.setItem(this.lsChatId, serialized)
            }
        }
        else {
            this.loadMessages()
        }
    }

    onSubmit (event) {
        event.preventDefault()

        if(this.$input.value !== ''){

            const currentDate = new Date()
            const message = document.createElement('message-bubble')
            // message object for serialization
            const msg = {}

            message.className += ' me'
            message.Classname = 'me'
            message.Name = 'Alexander'
            message.Status = 'sent'
            msg.name = 'Alexander'
            msg.className = 'me'
            msg.status = 'sent'
            
            this.$message.appendChild(message)

            // set message parameters

            message.Message = this.$input.value
            msg.message = this.$input.value
            const hours = currentDate.getHours()
            const minutes = currentDate.getMinutes()
            const msgTime = `${hours}:${((minutes  < 10) ? '0' : '')}${minutes}`

            msg.time = msgTime
            message.Time = msgTime

            // Clear input. Updating messages list
            this.$input.clear()
            this.messages.push(msg)

            message.scrollIntoView()

            // Message serialization. Put messages to localStorage 

            const serialized = JSON.stringify(this.messages)
            localStorage.setItem(this.lsChatId, serialized)
        }
    }

    onKeyPress (event) {
        if (event.keyCode === 13) {
            this.$form.dispatchEvent(new Event('submit'))
        }
    }

 
}

customElements.define('message-form', MessageForm)
