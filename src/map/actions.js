/* @flow */
'use strict'

import { List } from 'immutable'

import type {
  GooglePlace,
  GooglePlaceDetails
} from '../core/types'
import type { CardType } from './types'

export type MapAction
  = { type: 'map-search-request', search: string }
  | { type: 'map-search-success', places: List<GooglePlace> }
  | { type: 'map-search-failure' }

  | { type: 'map-place-get-all', places: List<GooglePlace> }
  | { type: 'map-place-select', place: GooglePlaceDetails }

  | { type: 'map-map-zoom-in' }
  | { type: 'map-map-zoom-out' }
  | { type: 'map-map-set-zoom', zoom: number }
  | { type: 'map-map-nav', lat: number, lon: number }

  | { type: 'map-card-add-request' }
  | { type: 'map-card-add-success' }
  | { type: 'map-card-add-failure' }

  | { type: 'map-card-create-start' }
  | { type: 'map-card-create-end' }
  | { type: 'map-card-create-title-edit', title: string }
  | { type: 'map-card-create-description-edit', description: string }
  | { type: 'map-card-create-location-edit', lat: number, lon: number }
  | { type: 'map-card-create-type-edit', cardType: CardType }
  | { type: 'map-card-create-start-time-edit', startTime: Date }
  | { type: 'map-card-create-end-time-edit', endTime: Date }
