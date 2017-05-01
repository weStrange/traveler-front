/* @flow */
'use strict'

import { combineReducers } from 'redux'

import location from './locationReducer'
import search from './searchReducer'

export default combineReducers({
  location,
  search
})
