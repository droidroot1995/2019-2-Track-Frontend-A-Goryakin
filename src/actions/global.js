import { GET_GLOBAL_REQUEST, GET_GLOBAL_SUCCESS, GET_GLOBAL_FAILURE } from '../constants/ActionTypes'

const getGlobalStarted = () => ({
  type: GET_GLOBAL_REQUEST,
})

const getGlobalSuccess = (uid, selected) => ({
  type: GET_GLOBAL_SUCCESS,
  payload: {
    uid,
    selected,
  },
})

const getGlobalFailure = (error) => ({
  type: GET_GLOBAL_FAILURE,
  payload: {
    error,
  },
})

export const getGlobal = (uid, selected) => {
  return (dispatch, getState) => {
    dispatch(getGlobalStarted())

    if (uid !== null && uid > 0) {
      if (typeof selected !== 'undefined') {
        dispatch(getGlobalSuccess(uid, selected))
      } else {
        dispatch(getGlobalSuccess(uid, -1))
      }
    } else {
      dispatch(getGlobalFailure('Invalid user id'))
    }
  }
}
