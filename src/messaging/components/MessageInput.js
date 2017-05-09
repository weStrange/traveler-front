/* @flow */
'use strict'

import React from 'react'

import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'

import type { WrappedChatRoom } from '../types'

type MessageInputProps = {
  currChatRoom: WrappedChatRoom,
  onTextEdit?: () => void
}

export default function MessageInput ({
  currChatRoom,
  onTextEdit = () => {}
}: MessageInputProps) {
  return (
    <Paper
      zDepth={5}
      style={{
        position: 'fixed',
        bottom: 0,
        right: 0,
        width: '75%',
        zIndex: 3
      }}>
      <TextField
        hintText='Full width'
        fullWidth
        value={
          currChatRoom
          ? currChatRoom.message
          : ''
        }
        onChange={onTextEdit}
      />
    </Paper>
  )
}
