/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable dot-notation */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable object-shorthand */
/* eslint-disable no-alert */
/* eslint-disable class-methods-use-this */

import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Transition, animated } from 'react-spring'
import { connect } from 'react-redux'
import { getGlobal } from '../actions/global'
import { getProfileInfo } from '../actions/profile'
import { openWebRtc, closeWebRtc } from '../actions/rtc'
import styles from '../styles/App.module.css'
import AuthForm from './AuthForm'
import ChatList from './ChatList'
import ChatInfo from './ChatInfo'
import GroupChatInfo from './GroupChatInfo'
import MessageForm from './MessageForm'
import MessageFormRtc from './MessageFormRtc'
import Profile from './Profile'
import Settings from './Settings'
import Messenger from './Messenger.Context'

const AnimatedRoute = ({ children }) => (
  <Route
    render={({ location }) => (
      <Transition
        native
        items={location}
        config={{ duration: 500 }}
        keys={(location) => location.pathname}
        from={{ opacity: 0, transform: 'translateY(100%)' }}
        enter={{ opacity: 1, transform: 'translateY(0)' }}
        leave={{ opacity: 0, transform: 'translateY(-100%)' }}
      >
        {(location) => (style) => (
          <animated.div className={styles.container} style={style}>
            {children(location)}
          </animated.div>
        )}
      </Transition>
    )}
  />
)

class App extends React.Component {
  constructor(props) {
    super(props)

    this.props = props

    this.abortController = new AbortController()
  }

  componentDidMount() {
    // const userId = prompt('Enter your id', 0)
    this.props.getProfInf()
    this.props.getGlob(0) // userId)
  }

  componentDidUpdate(prevProps) {
    if (this.props.userId !== prevProps.userId) {
      this.props.openWRtc(this.props.userId)
    }
  }

  componentWillUnmount() {
    this.abortController.abort()
    this.props.closeWRtc()
  }

  render() {
    return (
      <Messenger.Provider value={this}>
        <AnimatedRoute className={styles.container}>
          {(location) => (
            <Switch location={location}>
              <Route path="/chat_info" render={(props) => <ChatInfo />} />
              <Route path="/group_chat_info" render={(props) => <GroupChatInfo />} />
              <Route path="/rtc" render={(props) => <MessageFormRtc />} />
              <Route path="/settings" render={(props) => <Settings />} />
              <Route path="/profile" render={(props) => <Profile />} />
              <Route path="/chat" render={(props) => <MessageForm />} />
              <Route path="/list" render={(props) => <ChatList />} />
              <Route pathc="/login" render={(props) => <AuthForm />} />
              <Redirect to="/login" />
            </Switch>
          )}
        </AnimatedRoute>
      </Messenger.Provider>
    )
  }
}

const mapStateToProps = (state) => ({
  userId: state.profile.profile.username,
})

const mapDispatchToProps = (dispatch) => ({
  getProfInf: () => dispatch(getProfileInfo()),
  getGlob: (uid) => dispatch(getGlobal(uid)),
  openWRtc: (uid) => dispatch(openWebRtc(uid)),
  closeWRtc: () => dispatch(closeWebRtc()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
