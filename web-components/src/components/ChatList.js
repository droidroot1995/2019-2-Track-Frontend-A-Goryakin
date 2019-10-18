const template = document.createElement("template")
template.innerHTML = `
	<style>
	.chat_list {
		display: flex;
		display: -webkit-flex;

		flex: 1 1 auto;
        -webkit-flex: 1 1 auto;

        flex-direction: column;
        -webkit-flex-direction: column;

        height: 100%;
        background: #FFFFFF;
        overflow-x: hidden;
        overflow-y: hidden;
	}

	.header {
		flex: 1 1 8%;
        -webkit-flex: 1 1 8%;
        background: #8E24AA; 

        color: white;

        height: 13vh;

        display: flex;
        display: -webkit-flex;

        flex-direction: row;
        -webkit-flex-direction: row;
	}

	.chats_list {

		padding: .5em;

		flex: 1 1 92%;
        -webkit-flex: 1 1 92%;
        background: #FFFFFF; 

        display: flex;
        display: -webkit-flex;

        flex-direction: column;
        -webkit-flex-direction: column;

        flex-flow: column wrap;
        -webkit-flex-flow: column wrap;

        flex-wrap: nowrap;
        -webkit-flex-wrap: nowrap;
        overflow: auto;

        justify-content: flex-start;
        justify-content: -webkit-flex-start;

        flex-grow: 1;
        -webkit-flex-grow: 1;

        height: 87vh;
	}

	.chat_item {
		display: flex;
		display: -webkit-flex;

		flex-direction: row;
        -webkit-flex-direction: row;

		max-height: 10vh;
		width: 100%;
	}

	.new_chat {
		position: fixed;

		width: 50px;
		height: 50px;
		border-radius: 50px;

		background: #ffd54f;

		bottom: 3em;
		right: 3em;

		padding: 20px;

		z-index: 2;
	}

	</style>
	<div class="chat_list">
		<chat-list-header class="header"></chat-list-header>
		<div class="chats_list"></div>
		<new-chat-button class="new_chat"></new_chat-button>
	</div>
`

class ChatList extends HTMLElement {
	constructor(){
		super()
		this.shadowRoot = this.attachShadow({mode: 'open'})
		this.shadowRoot.appendChild(template.content.cloneNode(true))
		this.$header = this.shadowRoot.querySelector('.header')
		this.$chats_list = this.shadowRoot.querySelector('.chats_list')
		this.$new_chat = this.shadowRoot.querySelector('.new_chat')
		this.generateChats()
	}

	generateChats(){
		const chat1 = document.createElement('chat-list-item')
		this.$chats_list.appendChild(chat1)
		chat1.contactName = 'Alexey'
		chat1.contactAvatar = 'http://pikchyriki.net/avatar/krutye/64/30.jpg'
		chat1.lastMessageTime = '10:54'
		chat1.lastMessage = '1111'
		chat1.chatType = 'single'
		chat1.messageCheck = '99'
		chat1.addEventListener('click', this.onChatItemClick.bind(this))

		const chat2 = document.createElement('chat-list-item')
		this.$chats_list.appendChild(chat2)
		chat2.contactName = 'Planet 42'
		chat2.contactAvatar = 'http://pikchyriki.net/avatar/krutye/64/19.jpg'
		chat2.lastMessageTime = '22:05'
		chat2.lastMessage = 'Hello'
		chat2.chatType = 'group'
		chat2.messageCheck = '999'
		chat2.addEventListener('click', this.onChatItemClick.bind(this))

		const chat3 = document.createElement('chat-list-item')
		this.$chats_list.appendChild(chat3)
		chat3.contactName = 'Martin'
		chat3.contactAvatar = 'http://pikchyriki.net/avatar/krutye/64/21.jpg'
		chat3.lastMessageTime = '14:00'
		chat3.lastMessage = 'Добрый день!'
		chat3.chatType = 'single'
		chat3.messageCheck = 'sent'
		chat3.addEventListener('click', this.onChatItemClick.bind(this))

		const chat4 = document.createElement('chat-list-item')
		this.$chats_list.appendChild(chat4)
		chat4.contactName = 'Mikhail'
		chat4.contactAvatar = 'http://pikchyriki.net/avatar/krutye/64/24.jpg'
		chat4.lastMessageTime = '10:54'
		chat4.lastMessage = 'Доброе утро!'
		chat4.chatType = 'single'
		chat4.messageCheck = 'sent_read'
		chat4.addEventListener('click', this.onChatItemClick.bind(this))
	}

	onChatItemClick(event){
    	event.preventDefault()

    	this.smth = ''

    	const info = event.target.chatInfo

    	const messageForm = document.querySelector('message-form')
    	messageForm.chatInfo = info
    	messageForm.style.display = 'inline'
    	document.querySelector('chat-list').style.display = 'none'
    }
}

customElements.define('chat-list', ChatList)