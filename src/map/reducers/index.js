/* @flow */
'use strict'

import { combineReducers } from 'redux'

import location from './locationReducer'
import search from './searchReducer'
import cardCreate from './cardCreateReducer'

export default combineReducers({
  cardCreate,
  location,
  search
})
