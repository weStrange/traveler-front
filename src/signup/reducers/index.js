/* @flow */
'use strict'

import { combineReducers } from 'redux'

import signupInput from './signupInputReducer'
import city from './cityReducer'
import country from './countryReducer'

export default combineReducers({
  signupInput,
  country,
  city
})
