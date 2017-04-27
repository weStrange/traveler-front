/* @flow */
'use strict'

export type MapAction
  = { type: 'map-search-request' }
  | { type: 'map-search-success' }
  | { type: 'map-search-failure' }

  | { type: 'map-search-edit', search: string }

  | { type: 'map-card-add-request' }
