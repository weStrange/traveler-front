/* @flow */
'use strict'

import { List } from 'immutable'

import type { Action } from '../../actions'
import type { PersonalQueueState } from '../types'

function getDefaultState (): PersonalQueueState {
  return {
    cards: List(),
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
        cards: List(),
        nextOffset: 0
      }

    case 'card-queue-personal-load-success':
      return {
        cards: action.cards,
        nextOffset: action.cards.size
      }

    default:
      return state
  }
}
