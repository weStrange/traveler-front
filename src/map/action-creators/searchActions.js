/* @flow */
'use strict'

import { List } from 'immutable'

import * as client from '../../core/client'

import type { Action } from '../../actions'
import type { AppState } from '../../types'
import type { GooglePlace } from '../../core/types'

export function edit (search: string): any {
  return (dispatch: any, getState: () => AppState) => {
    dispatch(searchRequest(search))

    let {
      lat,
      lon,
      zoom
    } = getState().map.location

    return client.getGooglePlaces(search, lat, lon, zoom)
      .then((places) => {
        dispatch(searchSuccess(places))
      })
      .catch((error) => {
        console.log(error)

        dispatch(searchFailure())
      })
  }
}

function searchRequest (search: string): Action {
  return {
    type: 'map-search-request',
    search: search
  }
}

function searchSuccess (places: List<GooglePlace>): Action {
  return {
    type: 'map-search-success',
    places: places
  }
}

function searchFailure (): Action {
  return {
    type: 'map-search-failure'
  }
}
