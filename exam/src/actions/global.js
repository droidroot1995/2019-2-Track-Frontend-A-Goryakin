import {
  CHANGE_GLOBAL_REQUEST,
  CHANGE_GLOBAL_SUCCESS,
  CHANGE_GLOBAL_FAILURE,
  CHANGE_COORDS_REQUEST,
  CHANGE_COORDS_SUCCESS,
  CHANGE_COORDS_FAILURE,
} from '../constants/ActionTypes'

const changeGlobalStarted = () => ({
  type: CHANGE_GLOBAL_REQUEST,
})

const changeGlobalSuccess = (location, coords) => ({
  type: CHANGE_GLOBAL_SUCCESS,
  payload: {
    location,
  },
})

const changeGlobalFailure = (error) => ({
  type: CHANGE_GLOBAL_FAILURE,
  payload: error,
})

const setCoordsStarted = () => ({
  type: CHANGE_COORDS_REQUEST,
})

const setCoordsSuccess = (coords) => ({
  type: CHANGE_COORDS_SUCCESS,
  payload: {
    coords,
  },
})

const setCoordsFailure = (error) => ({
  type: CHANGE_COORDS_FAILURE,
  payload: error,
})

export const addLocation = (loc) => {
  return (dispatch, getState) => {
    dispatch(changeGlobalStarted())

    if (loc !== undefined && loc !== null && loc !== {}) {
      dispatch(changeGlobalSuccess(loc))
    } else {
      dispatch(changeGlobalFailure('location is empty'))
    }
  }
}

export const setLocation = (loc) => {
  return (dispatch, getState) => {
    dispatch(setCoordsStarted())

    if (loc !== undefined && loc !== null && loc !== {}) {
      dispatch(setCoordsSuccess(loc))
    } else {
      dispatch(setCoordsFailure('location is empty'))
    }
  }
}
