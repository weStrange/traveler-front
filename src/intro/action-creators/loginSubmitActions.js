/* @flow */
'use strict'

import { hashHistory } from 'react-router'

import * as client from '../../core/client'
import * as profileActions from '../../profile/action-creators'

import type { Action } from '../../actions'

export function submit (): any {
  return function (dispatch: any, getState: any) {
    dispatch(submitRequest())

    let username = getState().login.username
    let password = getState().login.password

    return client.signIn(
      username,
      password
    )
    .then(() => dispatch(submitSuccess()))
    .then(() => dispatch(profileActions
      .profileLoad
      .loadProfileInfo()))
    .then(() => hashHistory.push('/map'))
    .catch((error) => {
      console.error(error)
      return dispatch(submitFailure())
    })
  }
}

export function submitRequest (): Action {
  return {
    type: 'login-submit-request'
  }
}

export function submitSuccess (): Action {
  return {
    type: 'login-submit-success'
  }
}

export function submitFailure (): Action {
  return {
    type: 'login-submit-failure'
  }
}
