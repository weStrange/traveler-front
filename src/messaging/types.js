/* @flow */
'use strict'

import { List } from 'immutable'

import type { ChatRoom, Message } from '../core/types'

export type WrappedChatRoom = {
  room: ChatRoom,
  message: string,
  source: any
}

export type ChatRoomState = {
  all: List<WrappedChatRoom>,
  currId: number
}

export type MessageState = {
  all: List<Message>,
  offset: number
}

export type MessagingState = {
  chatRoom: ChatRoomState,
  message: MessageState
}
