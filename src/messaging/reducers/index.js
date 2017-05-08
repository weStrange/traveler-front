/* @flow */
'use strict'

import { combineReducers } from 'redux'

import chatRoom from './chatRoomReducer'
import message from './messageReducer'

export default combineReducers({
  chatRoom,
  message
})
