/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { searchChatsAndUsers, searchMessages, clearSearchResults } from '../actions/search'
import { useDebounce } from '../utils/debounce'
import SearchItem from './SearchItem'
import styles from '../styles/Search.module.css'

const Search = ({ placeholder, name, chatId, chats, messages, users, searchMsgs, searchCaU, clearResults }) => {
  const [searchTerm, setSearchTerm] = useState({
    prev: '',
    curr: '',
  })

  const style = name === 'msg' ? styles.msg_form_input : styles.uncn_form_input

  const textarea = useRef(null)

  const handleInputChange = (e) => {
    setSearchTerm({
      prev: searchTerm.curr,
      curr: e.target.value,
    })
  }

  const debouncedSearchTerm = useDebounce(searchTerm.curr, 500)

  useEffect(() => {
    if (debouncedSearchTerm && searchTerm.prev !== searchTerm.curr) {
      if (name === 'msg') {
        searchMsgs(searchTerm.curr, chatId)
      } else if (name === 'uncn') {
        searchCaU(searchTerm.curr)
      }
      setSearchTerm({
        prev: searchTerm.curr,
        curr: searchTerm.curr,
      })
    }
  }, [debouncedSearchTerm, searchTerm, searchCaU, searchMsgs, clearResults, chatId, name])

  const msg = name === 'msg' && messages.length > 0 ? <div className={styles.divider}>messages</div> : null
  const msgs =
    name === 'msg' && messages.length > 0
      ? messages.map((msgInfo, idx) => <SearchItem name="msg" key={idx} content={msgInfo} />)
      : null

  const chat = name === 'uncn' && chats.length > 0 ? <div className={styles.divider}>chats</div> : null
  const chts =
    name === 'uncn' && chats.length > 0
      ? chats.map((chatInfo, idx) => <SearchItem name="chat" key={idx} content={chatInfo} />)
      : null

  const user = name === 'uncn' && users.length > 0 ? <div className={styles.divider}>users</div> : null
  const usrs =
    name === 'uncn' && users.length > 0
      ? users.map((usrInfo, idx) => <SearchItem name="usr" key={idx} content={usrInfo} />)
      : null

  return (
    <div className={style}>
      <textarea
        id="message_input"
        type="text"
        className={styles.text_input}
        ref={textarea}
        placeholder={placeholder}
        onChange={(e) => handleInputChange(e)}
      />

      <div className={styles.results_container}>
        {chat}
        {chts}

        {user}
        {usrs}

        {msg}
        {msgs}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  chats: state.search.chats,
  messages: state.search.messages,
  users: state.search.users,
  chatId: state.messages.chatId,
})

const mapDispatchToProps = (dispatch) => ({
  searchMsgs: (txt, cid) => dispatch(searchMessages(txt, cid)),
  searchCaU: (txt) => dispatch(searchChatsAndUsers(txt)),
  clearResults: () => dispatch(clearSearchResults()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)
