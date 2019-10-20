const template = document.createElement('template')
template.innerHTML = `
	<style>

		.item {
			flex: 1 1 10%;

			height: 10vh;

			border-bottom: 1px solid grey;
			margin: 10px 1px 1px;
		}

		.avatar {
			position: relative;
			display: inline-block;
			border-radius: 50px;
			border: 1px solid black;
			align-self: center;
			height: 90%;
		}

		.message_info {
			position: relative;
			display: inline-block;
			vertical-align: top;
			height: 90%;
		}

		.info {
			position: relative;
			display: block;
			margin: 1px;
			width: 100%;
		}

		.message {
			position: relative;
			display: block;
			margin: 1px;
			width: 100%;
			margin: 20px 1px 1px;
		}

		.contact_name {
			position: relative;
			display: inline-block;
			font-size: 16px;
			margin: 1px 20px 1px;
		}

		.time {
			font-size: 14px;
			text-transform: uppercase;
			color: #666666;
			position: fixed;
			right: 2%;
		}

		.msg {
			position: relative;
			display: inline-block;
			font-size: 14px;
			color: #666666;
			margin: 1px 20px 1px;
		}

		.msg_check {
			display: none;
			position: fixed;
			right: 2%;
			padding: 5px;
			border-radius: 1.6em;
			width: 1.6em;
			height: 1.6em;
			text-align: center;
		}

		.msg_check.group {
			display: inline-block;
			background: #ffd54f;
			color: #756124;
		}

		.msg_check.single {
			display: inline-block;
			background: #8E24AA;
			color: white;
		}

		.sent {
			display: none;
			fill: #8E24AA;
			position: fixed;
			right: 2%;
			height: 30px;
			width: 30px;
		}

		.sent.set {
			display: inline-block;
		}

		.sent_read {
			display: none;
			fill: #8E24AA;
			position: fixed;
			right: 2%;
			height: 30px;
			width: 30px;
		}

		.sent_read.set {
			display: inline-block;
		}


	</style>
	<div class="item">
		<img class="avatar">
		<div class="message_info">
			<div class="info">
				<p class="contact_name"></p><span class="time"></span>
			</div>
			<div class="message">
				<p class="msg"></p>
				<span class="msg_check"></span>
				<svg xmlns="http://www.w3.org/2000/svg" class="sent" viewBox="0 0 512 512">
					<path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"/>
				</svg>
				<svg xmlns="http://www.w3.org/2000/svg" class="sent_read" viewBox="0 0 512 512">
					<path d="M505 174.8l-39.6-39.6c-9.4-9.4-24.6-9.4-33.9 0L192 374.7 80.6 263.2c-9.4-9.4-24.6-9.4-33.9 0L7 302.9c-9.4 9.4-9.4 24.6 0 34L175 505c9.4 9.4 24.6 9.4 33.9 0l296-296.2c9.4-9.5 9.4-24.7.1-34zm-324.3 106c6.2 6.3 16.4 6.3 22.6 0l208-208.2c6.2-6.3 6.2-16.4 0-22.6L366.1 4.7c-6.2-6.3-16.4-6.3-22.6 0L192 156.2l-55.4-55.5c-6.2-6.3-16.4-6.3-22.6 0L68.7 146c-6.2 6.3-6.2 16.4 0 22.6l112 112.2z"/>
				</svg>
			</div>
		</div>
	<div>
`

class ChatListItem extends HTMLElement {
	constructor(){
		super()
		this.shadowRoot = this.attachShadow({mode: 'open'})
		this.shadowRoot.appendChild(template.content.cloneNode(true))
		this.$avatar = this.shadowRoot.querySelector('.avatar')
		this.$contact = this.shadowRoot.querySelector('.contact_name')
		this.$time = this.shadowRoot.querySelector('.time')
		this.$message = this.shadowRoot.querySelector('.msg')
		this.$msg_check = this.shadowRoot.querySelector('.msg_check')
		this.$sent = this.shadowRoot.querySelector('.sent')
		this.$sent_read = this.shadowRoot.querySelector('.sent_read')

		this.info = {}
	}

	set contactName(name){
		this.$contact.textContent = name
		this.info.name  = name
	}

	set contactAvatar(avatar) {
		this.$avatar.src = avatar
		this.info.avatar = avatar
	}

	set lastMessageTime(time){
		this.$time.textContent = time
		this.info.time = time
	}

	set lastMessage(msg){
		this.$message.textContent = msg
		this.info.msg = msg
	}

	set chatType(cType){
		this.cType = cType
	}

	set chatId(cId){
		this.cId = cId
		this.info.chatId = cId
	}

	set messageCheck(check){

		this.info.msg_check = check

		if (check === 'sent'){
			this.$sent_read.className = 'sent_read'
			this.$msg_check.className = 'msg_check'
			this.$sent.classList.add('set')
		}
		else if (check === 'sent_read') {
			this.$sent_read.classList.add('set')
			this.$msg_check.className = 'msg_check'
			this.$sent.className = 'sent'
		}
		else {

			this.$sent_read.className = 'sent_read'
			this.$msg_check.className += ` ${this.cType}`
			this.$sent.className = 'sent'

			if(this.cType === 'single'){
				this.$msg_check.textContent = check
			}

			if(this.cType === 'group') {
				this.$msg_check.textContent = check
			}
		}
	}

	get chatInfo() {
		return this.info
	}
}

customElements.define('chat-list-item', ChatListItem)