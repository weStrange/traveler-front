/* @flow */
'use strict'

import { List } from 'immutable'

import * as client from '../../core/client'

import type { Action } from '../../actions'
import type { GooglePlace } from '../../core/types'
import type { AppState } from '../../types'

export function fetch (input: string): any {
  return (dispatch: any, getState: () => AppState) => {
    dispatch(fetchRequest(input))

    let {
      lat,
      lng,
      zoom
    } = getState().map.location

    return client.getGooglePlaces(input, lat, lng, zoom)
      .then((p) => (
        p === null
        ? dispatch(fetchFailure())
        : dispatch(fetchSuccess(p))
      ))
      .catch((error) => {
        console.error(error)

        dispatch(fetchFailure())
      })
  }
}

function fetchRequest (input: string): Action {
  return {
    type: 'map-card-create-location-options-fetch-request',
    input: input
  }
}

function fetchSuccess (options: List<GooglePlace>): Action {
  return {
    type: 'map-card-create-location-options-fetch-success',
    options: options
  }
}

function fetchFailure (): Action {
  return {
    type: 'map-card-create-location-options-fetch-failure'
  }
}
