import React from 'react'
import { render } from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import * as Sentry from '@sentry/browser'
import * as serviceWorker from './utils/registerServiceWorker'
import App from './components/App'
import ErrorBoundary from './components/ErrorBoundary'
import store from './store/store'
import './styles/globalStyles.css'

Sentry.init({ dsn: 'https://28968aa008544f3d942d711787fbd0a4@o385822.ingest.sentry.io/5219110' })

render(
  <Provider store={store}>
    <Router>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Router>
  </Provider>,
  document.getElementById('root'),
)

serviceWorker.register()
