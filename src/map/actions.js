/* @flow */
'use strict'

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
