/* @flow */
'use strict'

export type CoreAction
  = { type: 'core-signout-request' }
  | { type: 'core-signout-success' }
  | { type: 'core-signout-failure' }
