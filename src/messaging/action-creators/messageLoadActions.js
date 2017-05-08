/* @flow */
'use strict'

import { List } from 'immutable'

import * as client from '../../core/client'

import type { Action } from '../../actions'
import type { Message } from '../../core/types'
import type { AppState } from '../../types'

export function load (chatRoomId: number, offset: number): any {
  return (dispatch: any, getState: () => AppState) => {
    dispatch(loadRequest(chatRoomId))

    return client.getMessages(chatRoomId, offset) // TODO: add logic on varying limit
      .then((rs) => dispatch(loadSuccess(rs)))
      .catch((error) => {
        console.error(error)

        dispatch(loadFailure())
      })
  }
}

function loadRequest (chatRoomId: number): Action {
  return {
    type: 'messaging-messages-load-request',
    chatRoomId: chatRoomId
  }
}

function loadSuccess (messages: List<Message>): Action {
  return {
    type: 'messaging-messages-load-success',
    messages: messages
  }
}

function loadFailure (): Action {
  return {
    type: 'messaging-messages-load-failure'
  }
}
