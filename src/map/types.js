/* @flow */
'use strict'

import { List } from 'immutable'

import type {
  GooglePlace,
  GooglePlaceDetails
} from '../core/types'

export type SearchState = string

export type CardType = 'personal' | 'group' | 'none'

export type LocationState = {
  zoom: number,
  lng: number,
  lat: number
}

export type CardCreateState = {
  title: string,
  description: string,
  type: CardType,
  locationName: string,
  locationOptions: List<GooglePlace>,
  lat: number,
  lon: number,
  startTime: Date,
  endTime: Date,
  participants?: List<string>
}

export type PlaceState = {
  all: List<GooglePlace>,
  selected?: GooglePlaceDetails
}

export type MapState = {
  search: SearchState,
  location: LocationState,
  place: PlaceState,
  cardCreate: CardCreateState
}

export type Marker = {
  position: {
    lat: number,
    lgn: number
  },
  onClick: () => void
}
