/* @flow */
'use strict'

import { combineReducers } from 'redux'

import currentCard from './currentCardReducer'
import groupCards from './groupCardReducer'
import personalCards from './personalCardReducer'

export default combineReducers({
  currentCard,
  personalCards,
  groupCards
})
