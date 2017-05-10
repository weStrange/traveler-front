/* @flow */
'use strict'

import * as client from '../../core/client'

import type { Action } from '../../actions'
import type { AppState } from '../../types'

export function editText (message: string): Action {
  return {
    type: 'messaging-current-message-edit',
    message: message
  }
}

export function send (): any {
  return (dispatch: any, getState: () => AppState) => {
    let chatRoomId = getState().messaging.chatRoom.currId
    let text = getState().messaging
      .chatRoom
      .all
      .filter((p) => p.room.id === chatRoomId)
      .first()
      .message

    dispatch(sendRequest())

    client.sendMessage(chatRoomId, text)
      .then(() => dispatch(sendSuccess()))
      .catch((error) => {
        console.error(error)

        dispatch(sendFailure())
      })
  }
}

function sendRequest (): Action {
  return {
    type: 'messaging-current-message-send-request'
  }
}

function sendSuccess (): Action {
  return {
    type: 'messaging-current-message-send-success'
  }
}

function sendFailure (): Action {
  return {
    type: 'messaging-current-message-send-failure'
  }
}
