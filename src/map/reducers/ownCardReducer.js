/* @flow */
'use strict'

import { List } from 'immutable'

import type { OwnCardState } from '../types'
import type { MapAction } from '../actions'

function getDefaultState (): OwnCardState {
  return {
    personalCards: List(),
    groupCards: List()
  }
}

export default function placeReducer (
  state: OwnCardState = getDefaultState(),
  action: MapAction
): OwnCardState {
  switch (action.type) {
    case 'map-stop':
      return {
        ...getDefaultState()
      }

    case 'map-own-personal-cards-fetch-success':
      return {
        ...state,
        personalCards: action.cards
      }

    case 'map-own-group-cards-fetch-success':
      return {
        ...state,
        groupCards: action.cards
      }

    default:
      return state
  }
}
