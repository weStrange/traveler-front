/* @flow */
'use strict'

import { List } from 'immutable'

import type { Action } from '../../actions'
import type { GroupQueueState } from '../types'

function getDefaultState (): GroupQueueState {
  return {
    cards: List(),
    ownCards: List(),
    nextOffset: 0
  }
}

export default function groupCardReducer (
  state: GroupQueueState = getDefaultState(),
  action: Action
): GroupQueueState {
  switch (action.type) {
    case 'card-queue-stop':
      return {
        ...state,
        cards: List(),
        nextoffset: 0
      }

    case 'card-queue-group-load-success':
      return {
        ...state,
        cards: action.cards,
        nextOffset: state.nextOffset + action.cards.size
      }

    case 'card-queue-own-group-load-success':
      return {
        ...state,
        ownCards: action.cards
      }

    default:
      return state
  }
}
