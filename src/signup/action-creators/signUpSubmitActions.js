/* @flow */
'use strict'

import { ProfileUtils } from '../type-methods'

import * as client from '../../core/client'

import type { Action } from '../../actions'

export function submit () {
  return (dispatch: any, getState: any) => {
    dispatch(submitRequest())

    client.signUp(ProfileUtils.toProfile(getState().signup.signupInput))
      .then(() => dispatch(submitSuccess()))
      .catch((error) => {
        console.log(error)
        dispatch(submitFailure())
      })
  }
}

export function submitRequest (): Action {
  return {
    type: 'signup-submit-request'
  }
}

export function submitSuccess (): Action {
  return {
    type: 'signup-submit-success'
  }
}

export function submitFailure (): Action {
  return {
    type: 'signup-submit-failure'
  }
}
