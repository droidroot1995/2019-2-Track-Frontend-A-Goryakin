const template = document.createElement('template')
template.innerHTML = `
	<style>
		.message-bubble {
			align-self: flex-start;

			border-radius: 10px;
			min-width: 90px;
			height: auto;

			max-width: 50vw;
			position: relative;
			margin: 0 0 25px;
		}

		.message-bubble > .txt {
			padding: 8px 55px 8px 14px;
		}

		.txt > .name {
			font-weight: 600;
			font-size: 12px;
			margin: 0 0 4px;
			color: red;
		}

		.txt > .name.me {
			font-weight: 600;
			font-size: 12px;
			margin: 0 0 4px;
			color: #3498db;
		}

		.txt > .message {
			width: 100%;
			color: #212121;
			font-size: 12px;
			margin: 0 0 0 0;
			word-wrap: break-word;
		}

		.message-bubble.them > .txt > .message_info > .time {
			display: inline-block;
			font-size: 11px;
			position: absolute;
			bottom: 3px;
			right: 10px;
			text-transform: uppercase;
			color: #666666;
		}

		.message-bubble.me > .txt > .message_info > .time {
			display: inline-block;
			font-size: 11px;
			position: absolute;
			bottom: 3px;
			right: 30px;
			text-transform: uppercase;
			color: #666666;
		}

		.message_info > .sent {
			display: none;
			fill: #8E24AA;
			position: absolute;
			right: 10px;
			bottom: 10px;
			height: 10px;
			width: 10px;
		}

		.message_info > .sent.set {
			display: inline-block;
		}

		.message_info > .sent_read {
			display: none;
			fill: #8E24AA;
			position: absolute;
			right: 10px;
			bottom: 10px;
			height: 10px;
			width: 10px;
		}

		.message_info > .sent_read.set {
			display: inline-block;
		}

		.message-bubble.me {
			background: #f3e5f5;
			order: -1;
			margin-right: 1em;
			align-self: flex-end;
			align: right;
		}

		.message-bubble.me::after, .message-bubble.them::before{
			position: absolute;
			display: inline-block;
			content: '';
			width: 0;
			height: 0;
		}

		.message-bubble.me::after{
			border: .5em solid #f3e5f5;
			border-color: #f3e5f5 transparent transparent #f3e5f5;
			top: .5em;
			right: -1em;
		}

		.message-bubble.them {
			background: #f6e6e6;
			margin-left: 1em;
			align-self: flex-start;
			align: left;
		}

		.message-bubble.them::before {
			border: .5em solid #f6e6e6;
			border-color: #f6e6e6 #f6e6e6 transparent transparent;
			top: .5em;
			left: -1em;
		}

	</style>
	<div class="message-bubble">
	<div class="txt">
		<p class="name alt"></p>
		<p class="message"></p>
		<p class="message_info">
			<span class="time"></span>
			<svg xmlns="http://www.w3.org/2000/svg" class="sent" viewBox="0 0 512 512">
				<path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"/>
			</svg>
			<svg xmlns="http://www.w3.org/2000/svg" class="sent_read" viewBox="0 0 512 512">
				<path d="M505 174.8l-39.6-39.6c-9.4-9.4-24.6-9.4-33.9 0L192 374.7 80.6 263.2c-9.4-9.4-24.6-9.4-33.9 0L7 302.9c-9.4 9.4-9.4 24.6 0 34L175 505c9.4 9.4 24.6 9.4 33.9 0l296-296.2c9.4-9.5 9.4-24.7.1-34zm-324.3 106c6.2 6.3 16.4 6.3 22.6 0l208-208.2c6.2-6.3 6.2-16.4 0-22.6L366.1 4.7c-6.2-6.3-16.4-6.3-22.6 0L192 156.2l-55.4-55.5c-6.2-6.3-16.4-6.3-22.6 0L68.7 146c-6.2 6.3-6.2 16.4 0 22.6l112 112.2z"/>
			</svg>
		<p>
	</div>
	<div class="bubble-arrow"></div>
	</div>
`

class MessageBubble extends HTMLElement{

	constructor(){
		super()
		this.shadowRoot = this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template.content.cloneNode(true))

        this.$bubble = this.shadowRoot.querySelector('.message-bubble')
        this.$name = this.shadowRoot.querySelector('.name')
        this.$message = this.shadowRoot.querySelector('.message')
        this.$time = this.shadowRoot.querySelector('.time')

        this.$sent = this.shadowRoot.querySelector('.sent')
        this.$sent_read = this.shadowRoot.querySelector('.sent_read')
	}

	set Time(time){
		this.$time.textContent = time
	}

	set Message(message){
		this.$message.textContent = message
	}

	set Name(name){
		this.$name.textContent = name
	}

	set Status(status) {
		if(status === 'sent'){
			this.$sent.classList.add('set')
		}
		else if (status === 'sent_read'){
			this.$sent.className = 'sent'
			this.$sent_read.classList.add('set')
		}
		else {
			this.$sent.className = 'sent'
			this.$sent_read = 'sent_read'
		}
	}

	set Classname(name){
		const newName = `  ${name}`
		this.$bubble.className += newName
		this.$name.className += newName
	}
}

customElements.define('message-bubble', MessageBubble)