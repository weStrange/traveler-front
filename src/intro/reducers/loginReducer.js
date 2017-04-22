/* @flow */
'use strict'

import type { Action } from '../../actions'
import type { LoginState } from '../types'

function getDefaultState (): LoginState {
  return {
    username: '',
    password: ''
  }
}

export default function loginReducer (
  state: LoginState = getDefaultState(),
  action: Action
): LoginState {
  switch (action.type) {
    case 'login-username-edit':
      return {
        ...state,
        username: action.username
      }

    case 'login-password-edit':
      return {
        ...state,
        password: action.password
      }

    case 'login-submit-failure':
      return {
        ...state,
        ...getDefaultState()
      }

    default:
      return state
  }
}
