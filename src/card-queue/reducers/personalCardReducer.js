/* @flow */
'use strict'

import { List } from 'immutable'

import type { Action } from '../../actions'
import type { PersonalQueueState } from '../types'

function getDefaultState (): PersonalQueueState {
  return {
    cards: List(),
    ownCards: List(),
    nextOffset: 0
  }
}

export default function personalCardReducer (
  state: PersonalQueueState = getDefaultState(),
  action: Action
): PersonalQueueState {
  switch (action.type) {
    case 'card-queue-stop':
      return {
        ...state,
        cards: List(),
        nextOffset: 0
      }

    case 'card-queue-personal-load-success':
      return {
        ...state,
        cards: action.cards,
        nextOffset: action.cards.size
      }

    case 'card-queue-own-personal-load-success':
      return {
        ...state,
        ownCards: action.cards
      }

    default:
      return state
  }
}
