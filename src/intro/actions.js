/* @flow */
'use strict'

export type LoginAction
  = { type: 'login-username-edit', username: string }
  | { type: 'login-password-edit', password: string }

  | { type: 'login-submit-request' }
  | { type: 'login-submit-success' }
  | { type: 'login-submit-failure' }
