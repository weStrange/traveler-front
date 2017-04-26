/* @flow */
'use strict'

import { List } from 'immutable'

import * as client from '../../core/client'

import type { Action } from '../../actions'

export function load () {
  return (dispatch: any, getState: any) => {
    dispatch(loadRequest())

    client.getCities()
      .then((cs) => dispatch(loadSuccess(cs)))
      .catch((error) => {
        console.log(error)
        dispatch(loadFailure())
      })
  }
}

export function loadRequest (): Action {
  return {
    type: 'signup-cities-load-request'
  }
}

export function loadSuccess (cities: List<string>): Action {
  return {
    type: 'signup-cities-load-success',
    cities: cities
  }
}

export function loadFailure (): Action {
  return {
    type: 'signup-cities-load-failure'
  }
}
