/* @flow */
'use strict'

import { combineReducers } from 'redux'

import location from './locationReducer'
import search from './searchReducer'
import cardCreate from './cardCreateReducer'
import place from './placeReducer'

export default combineReducers({
  cardCreate,
  location,
  search,
  place
})
