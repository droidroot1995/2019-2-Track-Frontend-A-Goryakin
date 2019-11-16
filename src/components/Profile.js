/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react'
import ProfileHeader from './ProfileHeader'
import Messenger from './Messenger.Context'
import styles from '../styles/Profile.module.css'

const Profile = (props) => {
  const { style, userInfo } = props
  const { avatar, name, username, bio } = userInfo

  const [userAvatar, setUserAvatar] = useState(avatar)
  const [userFullName, setUserFullName] = useState(name)
  const [userUsername, setUserUsername] = useState(username)
  const [userBio, setUserBio] = useState(bio)

  const info = {
    avatar: userAvatar,
    name: userFullName,
    username: userUsername,
    bio: userBio,
  }

  return (
    <div style={style} className={styles.profile}>
      <Messenger.Consumer>
        {(val) => (
          <ProfileHeader
            returnToChatsList={val.returnToChatsList.bind(val)}
            saveUserInfo={val.saveUserInfo.bind(val)}
            userInfo={info}
          />
        )}
      </Messenger.Consumer>
      <div className={styles.profile_info}>
        <img className={styles.avatar} src={avatar} />
        <div className={styles.name_info}>
          <h6>Полное имя</h6>
          <input
            className={styles.name_input}
            placeholder="Имя и Фамилия"
            value={userFullName}
            onChange={(event) => setUserFullName(event.target.value)}
          />
        </div>
        <div className={styles.username_info}>
          <div className={styles.username}>
            <h6>Имя пользователя</h6>
            <input
              className={styles.username_input}
              placeholder="Имя пользователя"
              value={userUsername}
              onChange={(event) => setUserUsername(event.target.value)}
            />
          </div>
          <h6 className={styles.hint}>Минимальная длина 5 символов</h6>
        </div>
        <div className={styles.bio_info}>
          <div className={styles.bio}>
            <h6>Информация о себе</h6>
            <textarea
              className={styles.bio_input}
              placeholder="Информация о себе"
              value={userBio}
              onChange={(event) => setUserBio(event.target.value)}
            />
          </div>
          <h6 className={styles.hint}>Любая информация о себе</h6>
        </div>
      </div>
    </div>
  )
}

export default Profile
