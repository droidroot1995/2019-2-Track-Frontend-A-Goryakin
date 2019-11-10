import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import autoFill from './components/autoFill'
import './styles/globalStyles.css'


if(localStorage.getItem('chats') == null && localStorage.getItem('messages') == null) {
  autoFill()
}

render(
  <App/>,
  document.getElementById('root'),
)
