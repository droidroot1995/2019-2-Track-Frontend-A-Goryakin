const template = document.createElement('template')
template.innerHTML = `
	<style>
		.chat_list {
			display: flex;
			flex: 1 1 auto;
			flex-direction: column;

			position: relative;

			height: 100%;
			background: #FFFFFF;
			overflow-x: hidden;
			overflow-y: hidden;
		}

		.header {
			flex: 1 1 8%;
			background: #8E24AA;

			color: white;
			height: 13vh;

			display: flex;
			flex-direction: row;
		}

		.chats_list {

			padding: .5em;

			flex: 1 1 92%;
			background: #FFFFFF; 

			display: flex;

			flex-direction: column;

			flex-flow: column wrap;
			flex-wrap: nowrap;

			overflow: auto;
			justify-content: flex-start;

			flex-grow: 1;
			height: 87vh;
		}

		.chat_item {
			display: flex;

			flex-direction: row;

			max-height: 10vh;
			width: 100%;
		}

		chat-list-item:active {
			background: #A9A9A9;
			transition: all 0.5s ease-out;
		}

		.new_chat {

			position: absolute;

			width: 50px;
			height: 50px;
			border-radius: 50px;

			background: #ffd54f;

			bottom: 3em;
			right: 3em;

			padding: 20px;
			z-index: 1;
		}

		.new_chat:active {
			animation: pulse 1s infinite;
		}

		@keyframes pulse {
			0% {
				box-shadow: 0 0 0 0 rgba(204,169,44, 0.4);
			}

			70% {
				box-shadow: 0 0 0 20px rgba(204,169,44, 0);
			}

			100% {
				box-shadow: 0 0 0 0 rgba(204,169,44, 0);
			}
		}

		@media screen and (max-width: 389px) {

			.header {
				min-height: 90px;
				max-height: 90px;
			}

			.new_chat {
				bottom: 0.5em;
				right: 0.5em;
				width: 2em;
				height: 2em;
			}

		}

		@media screen and (min-width: 390px) and (max-width: 480px) {

			.header {
				min-height: 90px;
				max-height: 90px;
			}

			.new_chat {
				bottom: 0.5em;
				right: 0.5em;
				width: 2em;
				height: 2em;
			}

		}

		@media screen and (min-width: 481px) and (max-width: 767px) {
			.header {
				min-height: 90px;
				max-height: 90px;
			}

			.new_chat {
				bottom: 0.5em;
				right: 0.5em;
				width: 2em;
				height: 2em;
			}

		}

		@media screen and (min-width: 768px) and (max-width: 991px) {

			.header {
				min-height: 90px;
				max-height: 90px;
			}

			.new_chat {
				bottom: 0.5em;
				right: 0.5em;
				width: 2em;
				height: 2em;
			}

		}

		@media screen and (min-width: 992px) and (max-width: 1199px) {
			.header {
				min-height: 90px;
				max-height: 90px;
			}

			.new_chat {
				bottom: 0.5em;
				right: 0.5em;
				width: 2em;
				height: 2em;
			}

		}

		@media screen and (min-width: 1200px) {
			.header {
				min-height: 100px;
				max-height: 100px;
			}

			chat-list-item:hover {
				background: #F5F5F5;
				transition: all 0.1s ease-out;
			}

			.new_chat:hover {
				animation: 0.5s flip ease-out;
			}

			@keyframes flip {
				0%, 25% {
					transform: rotate(90deg);
				}

				25%, 50% {
					transform: rotate(180deg);
				}

				50%, 75% {
					transform: rotate(270deg);
				}

				75%, 100% {
					transform: rotate(360deg);
				}
			}	

			.new_chat:active {
				animation: pulse 1s infinite;
			}

			@keyframes pulse {
				0% {
					box-shadow: 0 0 0 0 rgba(204,169,44, 0.4);
				}

				70% {
					box-shadow: 0 0 0 20px rgba(204,169,44, 0);
				}

				100% {
					box-shadow: 0 0 0 0 rgba(204,169,44, 0);
				}
			}
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

		this.$new_chat.addEventListener('click', this.onNewChatClick.bind(this))
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
		chat1.messageCheck = '1'
		chat1.chatId = 1
		chat1.addEventListener('click', this.onChatItemClick.bind(this))

		const chat2 = document.createElement('chat-list-item')
		this.$chats_list.appendChild(chat2)
		chat2.contactName = 'Planet 42'
		chat2.contactAvatar = 'http://pikchyriki.net/avatar/krutye/64/19.jpg'
		chat2.lastMessageTime = '22:05'
		chat2.lastMessage = 'Hello'
		chat2.chatType = 'group'
		chat2.messageCheck = '1'
		chat2.chatId = 2
		chat2.addEventListener('click', this.onChatItemClick.bind(this))

		const chat3 = document.createElement('chat-list-item')
		this.$chats_list.appendChild(chat3)
		chat3.contactName = 'Martin'
		chat3.contactAvatar = 'http://pikchyriki.net/avatar/krutye/64/21.jpg'
		chat3.lastMessageTime = '14:00'
		chat3.lastMessage = 'Добрый день!'
		chat3.chatType = 'single'
		chat3.messageCheck = 'sent'
		chat3.chatId = 3
		chat3.addEventListener('click', this.onChatItemClick.bind(this))

		const chat4 = document.createElement('chat-list-item')
		this.$chats_list.appendChild(chat4)
		chat4.contactName = 'Mikhail'
		chat4.contactAvatar = 'http://pikchyriki.net/avatar/krutye/64/24.jpg'
		chat4.lastMessageTime = '10:54'
		chat4.lastMessage = 'Доброе утро!'
		chat4.chatType = 'single'
		chat4.messageCheck = 'sent_read'
		chat4.chatId = 4
		chat4.addEventListener('click', this.onChatItemClick.bind(this))
	}

	onChatItemClick(event){
    	event.preventDefault()

    	this.smth = ''

    	const info = event.target.chatInfo

    	const container = document.querySelector('chat-container')

    	container.MessageForm.chatInfo = info


        container.MessageForm.classList.remove('hide')
    	container.MessageForm.classList.add('show')
    }

    onNewChatClick(event) {
    	event.preventDefault()

    	const chatId = this.$chats_list.getElementsByTagName('chat-list-item').length + 1

    	const chat = document.createElement('chat-list-item')
    	this.$chats_list.appendChild(chat)
    	chat.contactName = 'New contact'
    	chat.contactAvatar = 'http://pikchyriki.net/avatar/krutye/64/76.jpg'
    	chat.lastMessageTime = ''
    	chat.lastMessage = ''
    	chat.chatType = 'single'
    	chat.chatId = chatId
    	chat.addEventListener('click', this.onChatItemClick.bind(this))
    	chat.scrollIntoView()
    }
}

customElements.define('chat-list', ChatList)