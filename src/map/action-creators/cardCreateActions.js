/* @flow */
'use strict'

import type { Action } from '../../actions'
import type { CardType } from '../types'

export function start (): Action {
  return {
    type: 'map-card-create-start'
  }
}

export function end (): Action {
  return {
    type: 'map-card-create-end'
  }
}

export function editTitle (title: string): Action {
  return {
    type: 'map-card-create-title-edit',
    title: title
  }
}

export function editDescription (description: string): Action {
  return {
    type: 'map-card-create-description-edit',
    description: description
  }
}

export function editStartTime (startTime: Date): Action {
  return {
    type: 'map-card-create-start-time-edit',
    startTime: startTime
  }
}

export function editEndTime (endTime: Date): Action {
  return {
    type: 'map-card-create-end-time-edit',
    endTime: endTime
  }
}

export function editType (type: CardType): Action {
  return {
    type: 'map-card-create-type-edit',
    cardType: type
  }
}

export function editLocation (lat: number, lon: number): Action {
  return {
    type: 'map-card-create-location-edit',
    lat: lat,
    lon: lon
  }
}
