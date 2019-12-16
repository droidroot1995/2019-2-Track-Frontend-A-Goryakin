/* eslint-disable dot-notation */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react'
import ProfileHeader from './ProfileHeader'
import Messenger from './Messenger.Context'
import styles from '../styles/Profile.module.css'

const Profile = (props) => {
  const { style, userId } = props
  // const { avatar, name, username, bio } = userInfo

  const [userAvatar, setUserAvatar] = useState('')
  const [userFullName, setUserFullName] = useState('')
  const [userUsername, setUserUsername] = useState('')
  const [userBio, setUserBio] = useState('')

  /* const info = {
    avatar: userAvatar,
    name: userFullName,
    username: userUsername,
    bio: userBio,
  } */

  const [userInfo, setUserInfo] = useState({})

  const info = userInfo

  useEffect(() => {
    const getUserInfo = () => {
      fetch(`/users/profile?user_id=${userId}`)
        .then((resp) => resp.json())
        .then((data) => {
          const uinfo = data['profile']
          const user = {
            avatar: uinfo.avatar,
            fullname: uinfo.first_name,
            username: uinfo.username,
            bio: '',
          }

          setUserInfo(user)
        })
    }

    setTimeout(() => getUserInfo(), 100)
  }, [setUserInfo, userId])

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
        <img className={styles.avatar} src={info.avatar} />
        <div className={styles.name_info}>
          <h6>Полное имя</h6>
          <input
            className={styles.name_input}
            placeholder="Имя и Фамилия"
            value={info.fullname}
            onChange={(event) => setUserFullName(event.target.value)}
          />
        </div>
        <div className={styles.username_info}>
          <div className={styles.username}>
            <h6>Имя пользователя</h6>
            <input
              className={styles.username_input}
              placeholder="Имя пользователя"
              value={info.username}
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
              value={info.bio}
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
