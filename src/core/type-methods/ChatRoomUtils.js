/* @flow */
'use strict'

import { List } from 'immutable'

import { ProfileUtils } from '.'

import type {
  ChatRoom,
  ChatRoomPlain
} from '../types'

export function toPlain (
  room: ChatRoom
): ChatRoomPlain {
  return {
    id: room.id,
    active: room.active,
    timestamp: room.timestamp,
    participants: room.participants.map(ProfileUtils.toPlain).toArray()
  }
}

export function fromPlain (
  room: ChatRoomPlain
): ChatRoom {
  return {
    id: room.id,
    active: room.active,
    timestamp: room.timestamp,
    participants: List(room.participants).map(ProfileUtils.fromPlain)
  }
}
