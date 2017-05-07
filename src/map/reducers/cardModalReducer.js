/* @flow */
'use strict'

import type { CardModalState } from '../types'
import type { MapAction } from '../actions'

function getDefaultState (): CardModalState {
  return {
    card: null,
    locationName: ''
  }
}

export default function placeReducer (
  state: CardModalState = getDefaultState(),
  action: MapAction
): CardModalState {
  switch (action.type) {
    case 'map-card-modal-show':
      return {
        ...state,
        card: action.card
      }

    case 'map-card-modal-hide':
      return {
        ...getDefaultState()
      }

    case 'map-card-modal-location-name-success':
      return {
        ...state,
        locationName: action.name
      }

    default:
      return state
  }
}
