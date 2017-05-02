/* @flow */
'use strict'

import { List } from 'immutable'

export type SearchState = string

export type CardType = 'personal' | 'group' | 'none'

export type LocationState = {
  zoom: number,
  lon: number,
  lat: number
}

export type CardCreateState = {
  title: string,
  description: string,
  type: CardType,
  lat: number,
  lon: number,
  startTime: Date,
  endTime: Date,
  participants?: List<string>
}

export type MapState = {
  search: SearchState,
  location: LocationState,
  cardCreate: CardCreateState
}

export type Marker = {
  position: {
    lat: number,
    lgn: number
  },
  onClick: () => void
}
