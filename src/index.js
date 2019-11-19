import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './components/App'
import autoFill from './components/autoFill'
import './styles/globalStyles.css'

if (localStorage.getItem('chats') == null && localStorage.getItem('messages') == null) {
  autoFill()
}

render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root'),
)
