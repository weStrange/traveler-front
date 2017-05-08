/* @flow */
'use strict'

import type { Action } from '../../actions'
import type { CurrentCardState } from '../types'

function getDefaultState (): CurrentCardState {
  return {
    ownCard: null,
    targetIndex: 0,
    locationName: '',
    lastResult: false,
    match: false
  }
}

export default function currentCardReducer (
  state: CurrentCardState = getDefaultState(),
  action: Action
): CurrentCardState {
  switch (action.type) {
    case 'card-queue-stop':
      return {
        ...getDefaultState()
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

    case 'card-queue-target-card-next':
      return {
        ...state,
        targetIndex: state.targetIndex + 1,
        match: false
      }

    case 'card-queue-evaluate-success':
      return {
        ...state,
        match: action.match
      }

    default:
      return state
  }
}
