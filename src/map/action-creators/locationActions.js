/* @flow */
'use strict'

import type { Action } from '../../actions'
import type { GoogleLocation } from '../../core/types'

export function zoom (zoom: number): Action {
  return {
    type: 'map-map-set-zoom',
    zoom: zoom
  }
}

export function panTo (location: GoogleLocation): Action {
  return {
    type: 'map-map-nav',
    location: location
  }
}
