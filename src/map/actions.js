/* @flow */
'use strict'

import type { CardType } from './types'

export type MapAction
  = { type: 'map-search-request' }
  | { type: 'map-search-success' }
  | { type: 'map-search-failure' }

  | { type: 'map-search-edit', search: string }

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
