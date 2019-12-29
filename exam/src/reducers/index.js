import { combineReducers } from 'redux'
import global from './global'
import location from './location'

const rootReducer = combineReducers({
  global,
  location,
})

export default rootReducer
