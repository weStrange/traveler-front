/* @flow */
'use strict'

import { combineReducers } from 'redux'

import profileEdit from './profileEditReducer'
import profile from './profileReducer'

export default combineReducers({
  profileEdit,
  profile
})
