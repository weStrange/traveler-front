/* @flow */
'use strict'

import * as client from '../../core/client'

import type { Action } from '../../actions'
import type { CardType } from '../types'
import type { GoogleLocation } from '../../core/types'
import type { AppState } from '../../types'

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

export function editLocationName (name: string): Action {
  return {
    type: 'map-card-create-location-name-edit',
    name: name
  }
}

/*
**** client interaction ****
                          */

export function selectPlace (placeId: string): any {
  return (dispatch: any, getState: () => AppState) => {
    dispatch(selectPlaceRequest(placeId))

    return client.getGooglePlaceDetails(placeId)
      .then((p) => (
        p === null
        ? dispatch(selectPlaceFailure())
        : dispatch(selectPlaceSuccess({
          lat: p.geometry.location.lat(),
          lng: p.geometry.location.lng()
        }))
      ))
      .catch((error) => {
        console.error(error)

        dispatch(selectPlaceFailure())
      })
  }
}

function selectPlaceRequest (placeId: string): Action {
  return {
    type: 'map-card-create-location-request',
    placeId: placeId
  }
}

function selectPlaceSuccess (location: GoogleLocation): Action {
  return {
    type: 'map-card-create-location-success',
    location: location
  }
}

function selectPlaceFailure (): Action {
  return {
    type: 'map-card-create-location-failure'
  }
}
