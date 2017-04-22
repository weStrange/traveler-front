/* @flow */
'use strict'

import { ProfileUtils } from '../type-methods'

import * as client from '../../core/client'

import type { Action } from '../../actions'
import type { Profile } from '../types'

export function updateProfileInfo (): any {
  return (dispatch: any, getState) => {
    dispatch(updateProfileRequest())

    let oldProfile = getState().profile.profile
    let profile = {
      ...getState().profile.profileEdit,
      username: oldProfile.username
    }

    client.updateProfileInfo(ProfileUtils.toUpdateRequest(profile))
      .then((p) => dispatch(updateProfileSuccess(p)))
      .catch((error) => {
        console.error(error)
        return dispatch(updateProfileFailure())
      })
  }
}

export function updateProfileRequest (): Action {
  return {
    type: 'profile-update-request'
  }
}

export function updateProfileSuccess (profile: Profile): Action {
  return {
    type: 'profile-update-success',
    profile: profile
  }
}

export function updateProfileFailure (): Action {
  return {
    type: 'profile-update-failure'
  }
}
