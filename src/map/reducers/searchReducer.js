/* @flow */
'use strict'

import type { SearchState } from '../types'
import type { MapAction } from '../actions'

function getDefaultState (): SearchState {
  return ''
}

export default function searchReducerReducer (
  state: SearchState = getDefaultState(),
  action: MapAction
): SearchState {
  switch (action.type) {
    case 'map-search-request':
      return action.search

    default:
      return state
  }
}
