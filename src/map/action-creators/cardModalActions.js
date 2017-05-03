/* @flow */
'use strict'

import * as client from '../../core/client'

import type { Action } from '../../actions'
import type {
  GoogleLocation,
  PersonalCard,
  GroupCard
} from '../../core/types'

export function loadName (
  location: GoogleLocation
): any {
  return (dispatch: any, getState: any) => {
    dispatch(loadNameRequest(location))

    let { lat, lng } = location

    return client.getGooglePlaceByLocation(
      lat,
      lng
    )
      .then((r) => (r === null
        ? dispatch(loadNameFailure())
        : dispatch(loadNameSuccess(r.name))))
      .catch((error) => {
        console.error(error)
        dispatch(loadNameFailure())
      })
  }
}

function loadNameRequest (location: GoogleLocation):Action {
  return {
    type: 'map-card-modal-location-name-request',
    location: location
  }
}

function loadNameSuccess (name: string):Action {
  return {
    type: 'map-card-modal-location-name-success',
    name: name
  }
}

function loadNameFailure ():Action {
  return {
    type: 'map-card-modal-location-name-failure'
  }
}

export function show (card: PersonalCard | GroupCard): Action {
  return {
    type: 'map-card-modal-show',
    card: card
  }
}

export function hide (): Action {
  return {
    type: 'map-card-modal-hide'
  }
}
