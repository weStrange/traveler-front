/* @flow */
'use strict'

import { hashHistory } from 'react-router'

import * as client from '../client'

import type { AppState } from '../../types'
import type { Action } from '../../actions'

export function signout (): any {
  return (dispatch: any, getState: () => AppState) => {
    signoutRequest()

    client.signOut()
      .then(() => {
        signoutSuccess()

        hashHistory.push('/login')
      })
      .catch((error) => {
        console.error(error)
        signoutFailure()
      })
  }
}

function signoutRequest (): Action {
  return {
    type: 'core-signout-request'
  }
}

function signoutSuccess (): Action {
  return {
    type: 'core-signout-success'
  }
}

function signoutFailure (): Action {
  return {
    type: 'core-signout-failure'
  }
}
