/* @flow */
'use strict'

export type SearchState = string

export type MapState = {
  zoom: number,
  lon: number,
  lat: number
}

export type MapViewState = {
  search: SearchState,
  nav: MapState
}
