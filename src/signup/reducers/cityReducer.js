/* @flow */
'use strict'

import type { Action } from '../../actions'
import type { CityState } from '../types'

function getDefaultState (): CityState {
  return []
}

export default function countryReducer (
  state: CityState = getDefaultState(),
  action: Action
): CityState {
  switch (action.type) {
    case 'signup-cities-load-success':
      return action.cities.toArray()

    default:
      return state
  }
}
