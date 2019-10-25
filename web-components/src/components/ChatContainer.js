const template = document.createElement('template')
template.innerHTML = `
	<style>

		.container {
		    width: 100%;
		    height: 100%;

		    position: relative;

		    overflow: hidden;
		}

		.container * {
		    position: absolute;
		    height: 100%;
		    width: 100%;
		    z-index: 0;
		}

		.msform {
			top: -100%;
			z-index: 1;
			animation-duration: 0.3s;
			animation-timing-function: ease-in-out;
			animation-fill-mode: forwards;
		}

		.msform.show {
			animation-name: showMessageForm;
		}

		.msform.hide {
			animation-name: hideMessageForm;
		}

		@keyframes showMessageForm {
			from {
				top: -100%;
			}

			to {
				top: 0;
			}

		}

		@keyframes hideMessageForm {
			from {
				top: 0;
			}

			to {
				top: -100%;
			}
		}


	</style>
	<div class="container">
		<chat-list class="list"></chat-list>
		<message-form class="msform"></message-form>
	</div>
`

class ChatContainer extends HTMLElement {
	constructor(){
		super()
		this.shadowRoot = this.attachShadow({mode: 'open'})
		this.shadowRoot.appendChild(template.content.cloneNode(true))

		this.$chat_list = this.shadowRoot.querySelector('.list')
		this.$message_form = this.shadowRoot.querySelector('.msform')
	}

	get MessageForm(){
		return this.$message_form
	}

	get ChatList() {
		return this.$chat_list
	}
}

customElements.define('chat-container', ChatContainer)
