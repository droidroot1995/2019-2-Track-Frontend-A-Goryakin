/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/prop-types */
import React from 'react'
import ErrorBoundary from './ErrorBoundary'
import styles from '../styles/SearchItem.module.css'

const SearchItem = ({ name, content }) => {
  let item = null
  if (name === 'msg') {
    item = (
      <div className={styles.item}>
        <div className={styles.name}>{content.first_name}</div>
        <div className={styles.sub}>{content.content}</div>
      </div>
    )
  } else if (name === 'usr') {
    item = (
      <div className={styles.item}>
        <img className={styles.avatar} src="https://avotar.ru/avatar/krutye/64/76.jpg" />
        <div className={styles.message_info}>
          <div className={styles.info}>
            <p className={styles.name}>{content.first_name}</p>
            <div className={styles.sub}>{content.username}</div>
          </div>
        </div>
      </div>
    )
  } else {
    item = (
      <div className={styles.item}>
        <div className={styles.name}>{content.topic}</div>
        <div className={styles.sub}>{content.last_message}</div>
      </div>
    )
  }

  return <ErrorBoundary>{item}</ErrorBoundary>
}

export default SearchItem
