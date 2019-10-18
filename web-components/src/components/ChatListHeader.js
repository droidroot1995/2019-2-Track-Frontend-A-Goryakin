const template = document.createElement("template")
template.innerHTML = `
	<style>
		.menu {
			flex: 1 1 2%;
        	-webkit-flex: 1 1 2%;

        	fill: white;
        	margin: 2%;
        	height: 50%;

        	align-self: center;
		}

		.soft_name {
			flex: 1 1 96%;
        	-webkit-flex: 1 1 96%;

        	font-size: 22px;
        	font-weight: 600;

        	fill: white;
        	padding: 20px;
        	align-self: center;
		}

		.search {
			flex: 1 1 2%;
        	-webkit-flex: 1 1 2%;

        	fill: white;
        	margin: 2%;
        	height: 50%;
        	align-self: center;

		}

		.
	</style>
	<svg xmlns="http://www.w3.org/2000/svg"  class="menu" viewBox="0 0 448 512">
		<path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"/>
	</svg>
	<div class="soft_name">Messenger</div>
	<svg xmlns="http://www.w3.org/2000/svg" class="search" viewBox="0 0 512 512">
		<path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"/>
	</svg>
`

class ChatListHeader extends HTMLElement {
	constructor(){
		super();
		this.shadowRoot = this.attachShadow({mode: 'open'})
		this.shadowRoot.appendChild(template.content.cloneNode(true))
		this.$menu = this.shadowRoot.querySelector('.menu')
		this.$search = this.shadowRoot.querySelector('.search')
	}
}

customElements.define('chat-list-header', ChatListHeader)