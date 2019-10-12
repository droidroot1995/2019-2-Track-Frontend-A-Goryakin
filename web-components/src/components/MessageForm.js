const template = document.createElement('template')
template.innerHTML = `
    <style>
        form {
        	display: -webkit-flex;
            display: flex;

            flex: 1 1 auto;
            -webkit-flex: 1 1 auto;

            flex-direction: column;
            -webkit-flex-direction: column;

            height: 100%;
            background: #FFFFFF;
            overflow-x: hidden;
            overflow-y: hidden;
        }

        .message-input{
        	display: -webkit-flex;
            display: flex;

            flex: 1 1 5%;
            -webkit-flex: 1 1 5%;

            flex-direction: row;
            -webkit-flex-direction: row;
        }

        .header {
        	flex: 1 1 10%;
        	-webkit-flex: 1 1 10%;
        	background: #8E24AA; 

        	display: flex;
        	display: -webkit-flex;

            flex-direction: row;
        	-webkit-flex-direction: row;
        }

        form-input {
            
            padding: 5px;

            display: flex;
            display: -webkit-flex;

            flex: 1 1 5%;
            -webkit-flex: 1 1 5%;
        }

        .result {

            padding: .5em;

            display: flex;
            display: -webkit-flex;

            flex-direction: column;
            -webkit-flex-direction: column;

            flex-flow: column wrap;
            -webkit-flex-flow: column wrap;

            flex: 1 1 85%;
            -webkit-flex: 1 1 85%;

            flex-wrap: nowrap;
            -webkit-flex-wrap: nowrap;
            overflow: auto;

            justify-content: flex-start;
            justify-content: -webkit-flex-start;

            flex-grow: 1;
            -webkit-flex-grow: 1;
        }

        input[type=submit] {
            visibility: collapse;
        }

        message-bubble {
            align-self: flex-start;
            align-self: -webkit-flex-start;
        }

        message-bubble.them {
            align-self: flex-start;
            align-self: -webkit-flex-start;
        }

        message-bubble.me {
            align-self: flex-end;
            align-self: -webkit-flex-end;
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

        this.$form.addEventListener('submit', this.onSubmit.bind(this))
        this.$form.addEventListener('keypress', this.onKeyPress.bind(this))

        this.messages = []
        this.loadMessages()
    }

    loadMessages(){
        const serialized = localStorage.getItem('messages')

        if(serialized !== null){
            this.messages = JSON.parse(serialized)

            for(let i = 0; i < this.messages.length; i+=1){
                const msg = this.messages[i]
                const message = document.createElement('message-bubble')
                this.$message.appendChild(message)
                message.className += (` ${msg.className}`)
                message.setClassname(msg.className)
                message.setName(msg.name)
                message.setMessage(msg.message)
                message.setTime(msg.time)
            }
        }
    }

    onSubmit (event) {
        event.preventDefault()

        const currentDate = new Date()
        const message = document.createElement('message-bubble')
        // message object for serialization
        const msg = {}

        // test messages bubble generation, generate dialog 
        const rnd = Math.floor(Math.random() * Math.floor(2))

        if(rnd === 0){
            message.className += " me"
            message.setClassname("me")
            message.setName("Alexander")
            msg.name = 'Alexander'
            msg.className = 'me'
        }
        else {
            message.className += " them"
            message.setClassname("them")
            message.setName("Alexey")
            msg.name = 'Alexey'
            msg.className = 'them'
        }
        
        this.$message.appendChild(message)

        // set message parameters

        message.setMessage(this.$input.value)
        msg.message = this.$input.value
        const hours = currentDate.getHours()
        const minutes = currentDate.getMinutes()
        const msgTime = `${hours}:${((minutes  < 10) ? "0" : "")}${minutes}`

        msg.time = msgTime
        message.setTime(msgTime)

        // Clear input. Updating messages list
        this.$input.clear()
        this.messages.push(msg)

        message.focus()

        // Message serialization. Put messages to localStorage 

        const serialized = JSON.stringify(this.messages)
        localStorage.setItem('messages', serialized)
    }

    onKeyPress (event) {
        if (event.keyCode === 13) {
            this.$form.dispatchEvent(new Event('submit'))
        }
    }

 
}

customElements.define('message-form', MessageForm)
