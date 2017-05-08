/* @flow */
'use strict'

import type { Action } from '../../actions'

export function editText (message: string): Action {
  return {
    type: 'messaging-current-message-edit',
    message: message
  }
}

export function send (): Action {
  return {
    type: 'messaging-current-message-send'
  }
}
