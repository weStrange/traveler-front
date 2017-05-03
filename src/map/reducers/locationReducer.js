/* @flow */
'use strict'

import type { LocationState } from '../types'
import type { MapAction } from '../actions'

function getDefaultState (): LocationState {
  return {
    zoom: 0,
    lat: 0,
    lng: 0
  }
}

export default function mapReducer (
  state: LocationState = getDefaultState(),
  action: MapAction
): LocationState {
  switch (action.type) {
    case 'map-map-nav':
      return {
        ...state,
        lat: action.location.lat,
        lng: action.location.lng
      }

    case 'map-map-set-zoom':
      return {
        ...state,
        zoom: action.zoom
      }

    default:
      return state
  }
}
