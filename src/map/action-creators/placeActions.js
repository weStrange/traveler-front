/* @flow */
'use strict'

import type { Action } from '../../actions'
import type { GooglePlaceDetails } from '../../core/types'

export function select (place: GooglePlaceDetails): Action {
  return {
    type: 'map-place-select',
    place: place
  }
}
