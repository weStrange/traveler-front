/* @flow */
'use strict'

import type { Action } from '../../actions'

export function selectChatRoom (id: number): Action {
  return {
    type: 'messaging-chatroom-select',
    id: id
  }
}
