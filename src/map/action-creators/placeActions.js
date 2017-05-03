/* @flow */
'use strict'

import * as client from '../../core/client'

import type { Action } from '../../actions'
import type { GooglePlaceDetails } from '../../core/types'
import type { AppState } from '../../types'

export function select (placeId: string): any {
  return (dispatch: any, getState: () => AppState) => {
    dispatch(selectRequest(placeId))

    return client.getGooglePlaceDetails(placeId)
      .then((p) => (
        p === null
        ? dispatch(selectFailure())
        : dispatch(selectSuccess(p))
      ))
      .catch((error) => {
        console.error(error)

        dispatch(selectFailure())
      })
  }
}

function selectRequest (placeId: string): Action {
  return {
    type: 'map-place-select-request',
    placeId: placeId
  }
}

function selectSuccess (place: GooglePlaceDetails): Action {
  return {
    type: 'map-place-select-success',
    place: place
  }
}

function selectFailure (): Action {
  return {
    type: 'map-place-select-failure'
  }
}
