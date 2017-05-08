/* @flow */
'use strict'

import type { Action } from '../../actions'
import type { Message } from '../../core/types'

export function setOffset (offset: number): Action {
  return {
    type: 'messaging-messages-offset-set',
    offset: offset
  }
}

export function receiveMessage (message: Message): Action {
  return {
    type: 'messaging-messages-receive',
    message: message
  }
}
