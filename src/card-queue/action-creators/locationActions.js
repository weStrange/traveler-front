/* @flow */
'use strict'

import * as client from '../../core/client'

import type { Action } from '../../actions'
import type { GoogleLocation } from '../../core/types'

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

export function loadNameRequest (location: GoogleLocation):Action {
  return {
    type: 'card-queue-card-location-name-load-request',
    location: location
  }
}

export function loadNameSuccess (name: string):Action {
  return {
    type: 'card-queue-card-location-name-load-success',
    name: name
  }
}

export function loadNameFailure ():Action {
  return {
    type: 'card-queue-card-location-name-load-failure'
  }
}
