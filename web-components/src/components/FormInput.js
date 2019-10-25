const template = document.createElement('template')
template.innerHTML = `
    <style>
        textarea {
            border: 0;
            outline: none;
            width: calc(100% - 2px);
            flex: 1 1 95%;

            resize: none;
            align-items: center;
        }

        svg {
            flex: 1 1 5%;

            fill: grey;
            padding: 10px;
        }

        path {
            transform: rotate(45deg);
            transform-origin: 50% 50%;
        }

        svg:active {
            background: #C0C0C0;
            transition: all 0.1s ease-out;
        }

        :host {
            display: inline-block;
            border: 1px solid rgba(25, 25, 25, 0.32);
        }

        @media screen and (max-width: 389px) {
            textarea {
                flex: 1 1 85%;
            }

            svg {
                flex: 1 1 15%;
            }
        }

        @media screen and (min-width: 390px) and (max-width: 480px) {
            textarea {
                flex: 1 1 90%;
            }

            svg {
                flex: 1 1 10%;
            }
        }

        @media screen and (min-width: 481px) and (max-width: 767px) {
            textarea {
                flex: 1 1 85%;
            }

            svg {
                flex: 1 1 15%;
            }
        }

        @media screen and (min-width: 768px) and (max-width: 991px) {

            textarea {
                flex: 1 1 95%;
            }

            svg {
                flex: 1 1 5%;
            }
        }

        @media screen and (min-width: 992px) and (max-width: 1199px) {
            textarea {
                flex: 1 1 95%;
            }

            svg {
                flex: 1 1 5%;
            }
        }

        @media screen and (min-width: 1200px){
            svg:hover {
                background: #D3D3D3;
                transition: all 0.1s ease-out;
            }
        }
    </style>
    <textarea type="text" placeholder="Введите сообщение"></textarea>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path d="M43.246 466.142c-58.43-60.289-57.341-157.511 1.386-217.581L254.392 34c44.316-45.332 116.351-45.336 160.671 0 43.89 44.894 43.943 117.329 0 162.276L232.214 383.128c-29.855 30.537-78.633 30.111-107.982-.998-28.275-29.97-27.368-77.473 1.452-106.953l143.743-146.835c6.182-6.314 16.312-6.422 22.626-.241l22.861 22.379c6.315 6.182 6.422 16.312.241 22.626L171.427 319.927c-4.932 5.045-5.236 13.428-.648 18.292 4.372 4.634 11.245 4.711 15.688.165l182.849-186.851c19.613-20.062 19.613-52.725-.011-72.798-19.189-19.627-49.957-19.637-69.154 0L90.39 293.295c-34.763 35.56-35.299 93.12-1.191 128.313 34.01 35.093 88.985 35.137 123.058.286l172.06-175.999c6.177-6.319 16.307-6.433 22.626-.256l22.877 22.364c6.319 6.177 6.434 16.307.256 22.626l-172.06 175.998c-59.576 60.938-155.943 60.216-214.77-.485z"/>
    </svg>
`

class FormInput extends HTMLElement {
    constructor () {
        super()
        this.shadowRoot = this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template.content.cloneNode(true))
        this.$input = this.shadowRoot.querySelector('textarea')

        this.$input.addEventListener('keypress', this.onKeyPress.bind(this))
    }

    static get observedAttributes() {
        return ['name', 'value', 'placeholder', 'disabled']
    }

    clear(){
        this.$input.value = ''
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.$input.setAttribute(name, newValue)
    }

    get value() {
        return this.$input.value
    }

    onKeyPress (event) {
        if (event.keyCode === 13) {
            event.preventDefault()
            this.$input.value = this.$input.value
        }
    }
}

customElements.define('form-input', FormInput)
