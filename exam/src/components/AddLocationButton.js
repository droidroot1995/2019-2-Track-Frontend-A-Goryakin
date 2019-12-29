/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React from 'react'
import { connect } from 'react-redux'
import { addNewLocation } from '../actions/location'
import styles from '../styles/AddLocationButton.module.css'

const AddLocationButton = (props) => {
  const { addLoc } = props
  return (
    <div className={styles.add_loc} onClick={() => addLoc()}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className={styles.add_loc_svg}>
        <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
      </svg>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  addLoc: () => dispatch(addNewLocation()),
})

export default connect(
  null,
  mapDispatchToProps,
)(AddLocationButton)
