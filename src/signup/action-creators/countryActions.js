/* @flow */
'use strict'

import { List } from 'immutable'

import * as client from '../../core/client'

import type { Action } from '../../actions'

export function load () {
  return (dispatch: any, getState: any) => {
    dispatch(loadRequest())

    client.getCountries()
      .then((cs) => dispatch(loadSuccess(cs)))
      .catch((error) => {
        console.log(error)
        dispatch(loadFailure())
      })
  }
}

export function loadRequest (): Action {
  return {
    type: 'signup-countries-load-request'
  }
}

export function loadSuccess (countries: List<string>): Action {
  return {
    type: 'signup-countries-load-success',
    countries: countries
  }
}

export function loadFailure (): Action {
  return {
    type: 'signup-countries-load-failure'
  }
}
