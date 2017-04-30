/* @flow */
'use strict'

import type { MapState } from '../types'
import type { MapAction } from '../actions'

export default function mapReducer (
  state: MapState,
  action: MapAction
): MapState {
  switch (action.type) {
    default:
      return state
  }
}
