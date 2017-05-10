/* @flow */
'use strict'

import { List } from 'immutable'

import type { MessagingAction } from '../actions'
import type { ChatRoomState } from '../types'

function getDefaultState (): ChatRoomState {
  return {
    all: List(),
    currId: 0
  }
}

export default function cardCreateReducer (
  state: ChatRoomState = getDefaultState(),
  action: MessagingAction
): ChatRoomState {
  switch (action.type) {
    case 'messaging-stop':
      console.log('messaging was stop')
      state.all.forEach((p) => {
        p.source.close()
      })

      return {
        ...getDefaultState()
      }

    case 'messaging-chatrooms-load-success':
      return {
        ...state,
        all: action.chatRooms
      }

    case 'messaging-chatroom-select':
      return {
        ...state,
        currId: action.id
      }

    case 'messaging-current-message-edit':
      let editAction = action
      return {
        ...state,
        all: state.all
          .map((p) => p.room.id === state.currId
          ? { ...p, message: editAction.message }
          : p)
      }

    case 'messaging-current-message-send-request':
      return {
        ...state,
        all: state.all
          .map((p) => p.room.id === state.currId
          ? { ...p, message: '' }
          : p)
      }

    default:
      return state
  }
}
