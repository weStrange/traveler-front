/* @flow */
/* global EventSource */
'use strict'

import { List } from 'immutable'

import * as client from '../../core/client'

import { receiveMessage } from './messageActions'
import { load as loadMessages } from './messageLoadActions'
import { selectChatRoom } from './chatRoomActions'

import type { Action } from '../../actions'
import type { WrappedChatRoom } from '../types'
import type { AppState } from '../../types'

export function load (): any {
  return (dispatch: any, getState: () => AppState) => {
    dispatch(loadRequest())

    return client.getChatRooms()
      .then((rs) => {
        let chatRoomState = getState().messaging.chatRoom

        let wrappedRs = rs.map((p) => {
          let oldChatRoom = chatRoomState.all
            .filter((t) => t.room.id === p.id)
            .first()

          let source
          if (oldChatRoom) {
            source = oldChatRoom.source
          } else {
            // $FlowIgnore
            source = new EventSource('/sse/' + p.id)

            source.onmessage = (ev) => {
              dispatch(receiveMessage(JSON.parse(ev.data)))
            }
          }

          return {
            room: p,
            message: oldChatRoom
            ? oldChatRoom.message
            : '',
            source: source
          }
        })

        dispatch(loadSuccess(wrappedRs))

        return wrappedRs
      })
      .then((rs) => {
        if (!rs.isEmpty()) {
          dispatch(loadMessages(rs.first().room.id, 0))
          dispatch(selectChatRoom(rs.first().room.id))
        }
      })
      .catch((error) => {
        console.error(error)

        dispatch(loadFailure())
      })
  }
}

function loadRequest (): Action {
  return {
    type: 'messaging-chatrooms-load-request'
  }
}

function loadSuccess (chatRooms: List<WrappedChatRoom>): Action {
  return {
    type: 'messaging-chatrooms-load-success',
    chatRooms: chatRooms
  }
}

function loadFailure (): Action {
  return {
    type: 'messaging-chatrooms-load-failure'
  }
}
