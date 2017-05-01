/* @flow */
'use strict'

export type SearchState = string

export type LocationState = {
  zoom: number,
  lon: number,
  lat: number
}

export type MapState = {
  search: SearchState,
  location: LocationState
}
