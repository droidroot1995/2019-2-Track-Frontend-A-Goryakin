const template = document.createElement('template')
template.innerHTML = `
	<style>
		.return {
            flex: 1 1 2%;

            fill: white;
            margin: 2%;
            height: 50%;
            align-self: center;
            position: relative;
        }

        .return:active {
        	background: #c23ee5;
        	transition: all 0.2s ease-out;
        }

        .search {
            flex: 1 1 2%;

            fill: white;
            margin: 2%;
            height: 50%;
            align-self: center;
            position: relative;
        }

        .search:active {
        	background: #c23ee5;
        	transition: all 0.2s ease-out;
        }

        

        .contact_info {
            flex: 1 1 94%;
            
            height: fit-content;
            align-self: center;
            position: relative;
        }

        .avatar {
            border-radius: 60%;
            margin: 2%;
            display: inline-block;
            vertical-align: middle;

            position: relative;
        }

        .info {
            margin: 2%;
            display: inline-block;
            vertical-align: middle;
            position: relative;
        }

        .contact_name {
            font-size: 18px;
            font-weight: 600;
            margin: 0%;
            color: #FFFFFF;
            position: relative;
        }

        .contact_last_online {
            color: #d1a7dd;
            font-size: 14px;
            font-weight: 300;
            margin: 0%;
            position: relative;
        }

        .menu_button {
            flex: 1 1 2%;

            fill: white;
            margin: 2%;
            height: 30%;
            align-self: center;

            position: relative;
        }

        .menu_button:active {
        	background: #c23ee5;
        	transition: all 0.2s ease-out;
        }

        .menu {
            display: none;
            list-style: none;
            background: #F6F6F6;
            margin: 0px;
            padding: 2px;
            min-height: 30px;
            position: absolute;
            right: 5%;
            top: 13vh;
            width: 10vw;

            z-index: 2;
            border: 1px solid #999;
            border-radius: 5px;
        }

        .menu.open {
            display: block;
        }

        .menu_item {
            font-size: 16px;
            font-weight: 600;
            height: 30px;
            margin: 0px;
            width: 100%;
        }

        .menu_item:active {
        	background: #C0C0C0;
            transition: all 0.1s ease-out;
        }

        @media screen and (max-width: 320px) {
            .return {
            	flex: 1 1 7%;
            }

            .contact_info {
            	flex: 1 1 100%;
            }

            .search {
            	flex: 1 1 7%;
            }

            .menu_button {
            	flex: 1 1 7%;
            }

            .menu {
            	top: 100px;
            	min-width: 50px;
            }
        }

        @media screen and (min-width: 321px) and (max-width: 389px) {
            .return {
            	flex: 1 1 10%;
            }

            .contact_info {
            	flex: 1 1 95%;
            }

            .search {
            	flex: 1 1 10%;
            }

            .menu_button {
            	flex: 1 1 15%;
            }

            .menu {
            	top: 100px;
            	min-width: 50px;
            }
        }

        @media screen and (min-width: 390px) and (max-width: 480px) {
            .return {
            	flex: 1 1 10%;
            }

            .contact_info {
            	flex: 1 1 90%;
            }

            .search {
            	flex: 1 1 10%;
            }

            .menu_button {
            	flex: 1 1 15%;
            }

            .menu {
            	top: 100px;
            	min-width: 50px;
            }
        }

        @media screen and (min-width: 481px) and (max-width: 767px) {
            .return {
            	flex: 1 1 10%;
            }

            .contact_info {
            	flex: 1 1 90%;
            }

            .search {
            	flex: 1 1 10%;
            }

            .menu_button {
            	flex: 1 1 10%;
            	min-height: 45%;

            }

            .menu {
            	top: 100px;
            	min-width: 50px;
            }
        }

        @media screen and (min-width: 768px) and (max-width: 991px) {

            .return {
            	flex: 1 1 10%;
            }

            .contact_info {
            	flex: 1 1 70%;
            }

            .search {
            	flex: 1 1 10%;
            }

            .menu_button {
            	flex: 1 1 10%;
            	min-height: 50%;
            }

            .menu {
            	top: 100px;
            	min-width: 50px;
            }
        }

        @media screen and (min-width: 992px) and (max-width: 1199px) {
            .return {
            	flex: 1 1 10%;
            }

            .contact_info {
            	flex: 1 1 80%;
            }

            .search {
            	flex: 1 1 10%;
            }

            .menu_button {
            	flex: 1 1 10%;
            	min-height: 50%;
            }

            .menu {
            	top: 100px;
            	min-width: 50px;
            }
        }

        @media screen and (min-width: 1200px){
        	.return {
        		padding: 5px;
	            border-radius: 10px;
        	}

        	.search {
        		padding: 5px;
	            border-radius: 10px;
        	}

        	.menu_button {
        		padding: 5px;
	            border-radius: 10px;
        	}
        	.search:hover {
        		fill: #D3D3D3;
        		transition: all 0.1s ease-out;
        	}

        	.return:hover {
        		fill: #D3D3D3;
        		transition: all 0.1s ease-out;
        	}

        	.menu_button:hover {
        		fill: #D3D3D3;
        		transition: all 0.1s ease-out;
        	}

        	.menu_item:hover {
        		background: #D3D3D3;
        		transition: all 0.1s ease-out;
        	}

        	.menu_item:active {
        		background: #C0C0C0;
        		transition: all 0.1s ease-out;
        	}
        }


	</style>
    <svg xmlns="http://www.w3.org/2000/svg" class="return" viewBox="0 0 448 512"><path d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"/></svg>
    <div class="contact_info">
    	<img class="avatar" src="http://pikchyriki.net/avatar/krutye/64/30.jpg"></img>
    		<div class="info">
    			<h2 class="contact_name">Alexey</h2>
    			<p class="contact_last_online">was online 2 hours ago</p>	
    		</div>
    	</div>
    	<svg xmlns="http://www.w3.org/2000/svg" class="search" viewBox="0 0 512 512"><path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"/></svg>
    	<svg xmlns="http://www.w3.org/2000/svg" class="menu_button" viewBox="0 0 192 512"><path d="M96 184c39.8 0 72 32.2 72 72s-32.2 72-72 72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72 72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0 352c0 39.8 32.2 72 72 72s72-32.2 72-72-32.2-72-72-72-72 32.2-72 72z"/></svg>
    	<menu class="menu">
    		<li class="menu_item"><a>Info</a></li>
    		<li class="menu_item"><a>Mute</a></li>
    	</menu>
    </div>
`

class ChatHeader extends HTMLElement {
	constructor(){
		super()
		this.shadowRoot = this.attachShadow({mode: 'open'})
		this.shadowRoot.appendChild(template.content.cloneNode(true))

		this.$avatar = this.shadowRoot.querySelector('.avatar')
		this.$search = this.shadowRoot.querySelector('.search')
		this.$return = this.shadowRoot.querySelector('.return')

		this.$contact_name = this.shadowRoot.querySelector('.contact_name')
		this.$contact_last_online = this.shadowRoot.querySelector('.contact_last_online')

		this.$menu_button = this.shadowRoot.querySelector('.menu_button')
        this.$menu = this.shadowRoot.querySelector('.menu')

        this.$menu_button.addEventListener('click', this.onMenuClick.bind(this))
        this.$return.addEventListener('click', this.onReturnClick.bind(this))
	}

	set contactAvatar(avatar) {
		this.$avatar.src = avatar
	}

	set contactName(name) {
		this.$contact_name.textContent = name
	}

	onMenuClick(event){
    	event.preventDefault()
    	if(this.$menu.className === 'menu'){
    		this.$menu.className += ' open'
    	}
    	else {
    		this.$menu.className = 'menu'
    	}
    }

    onReturnClick(event){
    	event.preventDefault()

        this.$menu.className = 'menu'
        const container = document.querySelector('chat-container')
        container.MessageForm.classList.remove('show')
        container.MessageForm.classList.add('hide')
    }
}

customElements.define('chat-header', ChatHeader)