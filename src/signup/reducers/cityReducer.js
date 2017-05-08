/* @flow */
'use strict'

import { List } from 'immutable'

import type { Action } from '../../actions'
import type { CityState } from '../types'

function getDefaultState (): CityState {
  return List()
}

export default function countryReducer (
  state: CityState = getDefaultState(),
  action: Action
): CityState {
  switch (action.type) {
    case 'signup-stop':
      return getDefaultState()

    case 'signup-cities-load-success':
      return action.cities

    default:
      return state
  }
}
