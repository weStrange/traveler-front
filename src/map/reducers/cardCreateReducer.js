/* @flow */
'use strict'

import type { CardCreateState } from '../types'
import type { MapAction } from '../actions'

function getDefaultState (): CardCreateState {
  return {
    title: '',
    description: '',
    type: 'none',
    lat: 0,
    lon: 0,
    startTime: new Date(),
    endTime: new Date()
  }
}

export default function cardCreateReducer (
  state: CardCreateState = getDefaultState(),
  action: MapAction
): CardCreateState {
  switch (action.type) {
    case 'map-card-create-start':
      return {
        ...state,
        type: 'personal'
      }

    case 'map-card-create-end':
      return {
        ...state,
        ...getDefaultState()
      }

    case 'map-card-create-title-edit':
      return {
        ...state,
        title: action.title
      }

    case 'map-card-create-description-edit':
      return {
        ...state,
        description: action.description
      }

    case 'map-card-create-start-time-edit':
      return {
        ...state,
        startTime: action.startTime
      }

    case 'map-card-create-end-time-edit':
      return {
        ...state,
        endTime: action.endTime
      }

    case 'map-card-create-type-edit':
      return {
        ...state,
        type: action.cardType
      }

    case 'map-card-create-location-edit':
      return {
        ...state,
        lat: action.lat,
        lon: action.lon
      }

    default:
      return state
  }
}
