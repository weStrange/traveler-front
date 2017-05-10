/* @flow */
'use strict'

import { hashHistory } from 'react-router'

import { ProfileUtils } from '../type-methods'

import * as client from '../../core/client'

import type { Action } from '../../actions'

export function submit () {
  return (dispatch: any, getState: any) => {
    dispatch(submitRequest())

    let {
      username,
      password
    } = getState().signup.signupInput

    client.signUp(ProfileUtils.toProfile(getState().signup.signupInput))
      .then(() => client.signIn(username, password))
      .then(() => {
        if (
          getState().signup
            .signupInput
            .imageFile !== null
        ) {
          client.uploadProfilePhoto(
            getState().signup
              .signupInput
              .imageFile
          )

          return true
        }

        return true
      })
      .then(() => dispatch(submitSuccess()))
      .then(() => hashHistory.push('/map'))
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
