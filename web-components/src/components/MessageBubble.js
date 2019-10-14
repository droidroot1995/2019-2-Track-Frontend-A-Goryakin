const template = document.createElement('template')
template.innerHTML = `
	<style>
		.message-bubble {
			align-self: flex-start;
			align-self: -webkit-flex-start;

			border-radius: 10px;
			min-width: 250px;
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

		.txt > .time {
			display: inline-block;
			font-size: 11px;
			position: absolute;
			bottom: 3px;
			right: 10px;
			text-transform: uppercase;
			color: #666666;
		}

		.message-bubble.me {
			background: #f3e5f5;
			order: -1;
			margin-right: 1em;
			align-self: flex-end;
			align-self: -webkit-flex-end;
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
			align-self: -webkit-flex-start;
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
		<span class="time"></span>
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
	}

	setTime(time){
		this.$time.textContent = time
	}

	setMessage(message){
		this.$message.textContent = message
	}

	setName(name){
		this.$name.textContent = name
	}

	setClassname(name){
		const newName = `  ${name}`
		this.$bubble.className += newName
		this.$name.className += newName
	}
}

customElements.define('message-bubble', MessageBubble)