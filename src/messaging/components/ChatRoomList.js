/* @flow */
'use strict'

import React from 'react'

import Avatar from 'material-ui/Avatar'
import Paper from 'material-ui/Paper'
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble'

import { List as ImmutList } from 'immutable'
import { List, ListItem, makeSelectable } from 'material-ui/List'

import { oidToUrl } from '../../core/photo-utils'

import type { WrappedChatRoom } from '../types'

const SelectableList = makeSelectable(List)

type ChatRoomListProps = {
  chatRooms: ImmutList<WrappedChatRoom>,
  currRoomId: number,
  username: string,
  height: number,
  onItemClick?: () => void
}

export default function ChatRoomList ({
  chatRooms,
  currRoomId,
  username,
  height,
  onItemClick = () => {}
}: ChatRoomListProps) {
  return (
    <Paper zDepth={4} style={{
      width: '25%',
      float: 'left',
      height: height + 45,
      overflow: 'auto',
      margin: 0
    }}>
      <SelectableList
        value={currRoomId}
        >
        {
          chatRooms.map((p, i) => {
            let participant = p.room
              .participants
              .filterNot((p) => p.username === username)
              .first()
            let avatarPhoto = participant.photos.first()

            return (
              <ListItem
                key={i}
                value={p.room.id}
                onTouchTap={() => onItemClick(p.room.id)}
                primaryText={(<div>
                  {
                    p.room
                     .participants
                     .filterNot((t) => t.username === username)
                     .first().username
                }
                </div>)}
                leftAvatar={<Avatar src={avatarPhoto ? oidToUrl(avatarPhoto) : null} />}
                rightIcon={<CommunicationChatBubble />}
              />
            )
          })
        }
      </SelectableList>
    </Paper>
  )
}
