/* @flow */
'use strict'

import * as client from '../../core/client'

import type { Action } from '../../actions'
import type { Profile } from '../types'

export function loadProfileInfo (): any {
  return (dispatch: any) => {
    dispatch(loadProfileRequest())

    client.getProfileInfo()
      .then((p) => dispatch(loadProfileSuccess(p)))
      .catch((error) => {
        console.error(error)
        return dispatch(loadProfileFailure())
      })
  }
}

export function loadProfileRequest (): Action {
  return {
    type: 'profile-load-request'
  }
}

export function loadProfileSuccess (profile: Profile): Action {
  return {
    type: 'profile-load-success',
    profile: profile
  }
}

export function loadProfileFailure (): Action {
  return {
    type: 'profile-load-failure'
  }
}
