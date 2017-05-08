/* @flow */
'use strict'

import { List } from 'immutable'

import type { MessagingAction } from '../actions'
import type { MessageState } from '../types'

function getDefaultState (): MessageState {
  return {
    all: List(),
    offset: 0
  }
}

export default function cardCreateReducer (
  state: MessageState = getDefaultState(),
  action: MessagingAction
): MessageState {
  switch (action.type) {
    case 'messaging-messages-load-success':
      return {
        ...state,
        all: action.messages
      }

    case 'messaging-messages-receive':
      return {
        ...state,
        all: state.all.push(action.message)
      }

    default:
      return state
  }
}
