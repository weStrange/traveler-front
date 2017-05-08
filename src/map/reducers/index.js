/* @flow */
'use strict'

import { combineReducers } from 'redux'

import location from './locationReducer'
import search from './searchReducer'
import cardCreate from './cardCreateReducer'
import place from './placeReducer'
import ownCard from './ownCardReducer'
import cardModal from './cardModalReducer'

export default combineReducers({
  cardCreate,
  location,
  search,
  place,
  ownCard,
  cardModal
})
