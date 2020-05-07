/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react'
import * as Sentry from '@sentry/browser'

class ErrorBoundary extends Component {
  state = {
    eventId: null,
    hasError: false,
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    Sentry.withScope((scope) => {
      scope.setExtras(errorInfo)
      const eventId = Sentry.captureException(error)
      this.setState({ eventId })
    })
  }

  render() {
    const { hasError, eventId } = this.state
    const children = this.props

    if (hasError) {
      // render fallback UI
      return <button onClick={() => Sentry.showReportDialog({ eventId })}>Report feedback</button>
    }

    // when there's not an error, render children untouched
    return children.children
  }
}

export default ErrorBoundary
