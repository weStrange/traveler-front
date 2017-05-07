/* @flow */
'use strict'

import type { Action } from '../../actions'

export function editUsername (username: string): Action {
  return {
    type: 'login-username-edit',
    username: username
  }
}

export function editPassword (password: string): Action {
  return {
    type: 'login-password-edit',
    password: password
  }
}

export function stop () {
  return {
    type: 'login-stop'
  }
}
