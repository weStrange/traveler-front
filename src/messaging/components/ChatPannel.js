/* @flow */
/* global KeyboardEvent */
'use strict'

import React, { Component } from 'react'

import Avatar from 'material-ui/Avatar'
import { List, ListItem, makeSelectable } from 'material-ui/List'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble'

import { List as ImmutList } from 'immutable'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actionCreators from '../action-creators'

import { MessageView } from '.'

import type { WrappedChatRoom } from '../types'
import type { Message } from '../../core/types'
import type { AppState } from '../../types'

const SelectableList = makeSelectable(List)

type ChatProps = {
  chatRooms: ImmutList<WrappedChatRoom>,
  messages: ImmutList<Message>,
  currRoomId: number,
  username: string,
  actions: any
}

export class Chat extends Component {
  props: ChatProps;
  _keyboardHandler: (ev: KeyboardEvent) => void;

  _keyboardHandler (ev: KeyboardEvent) {
    if (ev.keyCode === 13 && ev.srcElement.nodeName === 'INPUT') {
      this.props.actions.currentMessage.send()
    }
  }

  constructor (props: ChatProps) {
    super(props)

    props.actions.chatRoomLoad.load()
    this._keyboardHandler = this._keyboardHandler.bind(this)
  }

  componentDidMount () {
    window.addEventListener('keydown', this._keyboardHandler)
  }

  componentWillUnmount () {
    this.props.actions.common.stop()
    window.removeEventListener('keydown', this._keyboardHandler)
  }

  render () {
    const {
      messages,
      chatRooms,
      currRoomId,
      username,
      actions
    } = this.props

    let currChatRoom = chatRooms.filter((p) => p.room.id === currRoomId)
      .first()

    return (
      <div>
        <SelectableList
          value={currRoomId}
          style={{ width: '25%', float: 'left' }}>
          {
            chatRooms.map((p, i) => (
              <ListItem
                key={i}
                value={p.room.id}
                primaryText={(<div>
                  {p.room
                  .participants
                  .filterNot((t) => t.username === username)
                  .first().username}
                </div>)}
                leftAvatar={<Avatar />}
                rightIcon={<CommunicationChatBubble />}
              />
            ))
          }
        </SelectableList>

        <MessageView
          messages={messages}
          username={username} />

        <Paper
          zDepth={2}
          style={{
            position: 'fixed',
            bottom: 0,
            width: '100%',
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
            onChange={(ev, text) => actions.currentMessage.editText(text)}
          />
        </Paper>
      </div>
    )
  }
}

function mapStateToProps (state: AppState) {
  return {
    chatRooms: state.messaging.chatRoom.all,
    currRoomId: state.messaging.chatRoom.currId,
    messages: state.messaging.message.all,
    username: state.profile.profile.username
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: {
      common: bindActionCreators(actionCreators.commonActions, dispatch),
      chatRoom: bindActionCreators(actionCreators.chatRoomActions, dispatch),
      message: bindActionCreators(actionCreators.messageActions, dispatch),
      currentMessage: bindActionCreators(actionCreators.currentMessageActions, dispatch),
      chatRoomLoad: bindActionCreators(actionCreators.chatRoomLoadActions, dispatch),
      messageLoad: bindActionCreators(actionCreators.messageLoadActions, dispatch)
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat)
