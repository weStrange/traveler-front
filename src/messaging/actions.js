/* @flow */
'use strict'

import { List } from 'immutable'

import type { Message } from '../core/types'
import type { WrappedChatRoom } from './types'

export type MessagingAction
  = { type: 'messaging-chatrooms-load-request' }
  | { type: 'messaging-chatrooms-load-success', chatRooms: List<WrappedChatRoom> }
  | { type: 'messaging-chatrooms-load-failure' }

  | { type: 'messaging-chatroom-select', id: number }

  | { type: 'messaging-messages-load-request', chatRoomId: number }
  | { type: 'messaging-messages-load-success', messages: List<Message> }
  | { type: 'messaging-messages-load-failure' }

  | { type: 'messaging-messages-receive', message: Message }
  | { type: 'messaging-messages-offset-set', offset: number }

  | { type: 'messaging-current-message-edit', message: string }
  | { type: 'messaging-current-message-send-request' }
  | { type: 'messaging-current-message-send-success' }
  | { type: 'messaging-current-message-send-failure' }

  | { type: 'messaging-stop' }
