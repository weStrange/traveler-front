/* @flow */
'use strict'

import type { LocationState } from '../types'
import type { MapAction } from '../actions'

function getDefaultState (): LocationState {
  return {
    zoom: 0,
    lat: 0,
    lon: 0
  }
}

export default function mapReducer (
  state: LocationState = getDefaultState(),
  action: MapAction
): LocationState {
  switch (action.type) {
    default:
      return state
  }
}
