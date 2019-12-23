import { combineReducers } from 'redux'
import global from './global'
import location from './location'
import weather from './weather'

const rootReducer = combineReducers({
  global,
  location,
  // weather,
})

export default rootReducer
