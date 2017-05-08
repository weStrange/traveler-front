/* @flow */
'use strict'

import type { Action } from '../../actions'
import type { CountryState } from '../types'

function getDefaultState (): CountryState {
  return []
}

export default function countryReducer (
  state: CountryState = getDefaultState(),
  action: Action
): CountryState {
  switch (action.type) {
    case 'signup-stop':
      return getDefaultState()

    case 'signup-countries-load-success':
      return action.countries.toArray()

    default:
      return state
  }
}
