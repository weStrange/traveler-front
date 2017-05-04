/* @flow */
'use strict'

import type { Action } from '../../actions'
import type { CurrentCardState } from '../types'

function getDefaultState (): CurrentCardState {
  return {
    ownCard: null,
    targetCard: null,
    locationName: ''
  }
}

export default function currentCardReducer (
  state: CurrentCardState = getDefaultState(),
  action: Action
): CurrentCardState {
  switch (action.type) {
    case 'card-queue-stop':
      return {
        ...state,
        ownCard: null,
        targetCard: null
      }

    case 'card-queue-own-card-select':
      return {
        ...state,
        ownCard: action.card
      }

    case 'card-queue-card-location-name-load-success':
      return {
        ...state,
        locationName: action.name
      }

    case 'card-queue-target-card-select':
      return {
        ...state,
        targetCard: action.card
      }

    default:
      return state
  }
}
