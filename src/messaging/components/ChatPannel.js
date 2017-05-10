/* @flow */
/* global KeyboardEvent */
'use strict'

import React, { Component } from 'react'

import { List as ImmutList } from 'immutable'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actionCreators from '../action-creators'

import {
  MessageView,
  ChatRoomList,
  MessageInput
} from '.'

import type { WrappedChatRoom } from '../types'
import type { Message } from '../../core/types'
import type { AppState } from '../../types'

type ChatProps = {
  chatRooms: ImmutList<WrappedChatRoom>,
  messages: ImmutList<Message>,
  currRoomId: number,
  username: string,
  actions: any
}

type ChatState = {
  height: number
}

export class Chat extends Component {
  props: ChatProps;
  state: ChatState;
  _keyboardHandler: (ev: KeyboardEvent) => void;
  updateDimensions: () => void;

  _keyboardHandler (ev: KeyboardEvent) {
    let target: any = ev.target || ev.srcElement

    if (ev.keyCode === 13 && target.nodeName === 'INPUT') {
      this.props.actions.currentMessage.send()
    }
  }

  constructor (props: ChatProps) {
    super(props)

    this.state = {
      height: window.innerHeight - 110
    }

    props.actions.chatRoomLoad.load()
    this._keyboardHandler = this._keyboardHandler.bind(this)
    this.updateDimensions = this.updateDimensions.bind(this)
  }

  updateDimensions () {
    this.setState({
      height: window.innerHeight - 110
    })
  }

  componentWillMount () {
    this.updateDimensions()
  }

  componentDidMount () {
    window.addEventListener('keydown', this._keyboardHandler)
    window.addEventListener('resize', this.updateDimensions)
  }

  componentWillUnmount () {
    this.props.actions.common.stop()
    window.removeEventListener('keydown', this._keyboardHandler)
    window.removeEventListener('resize', this.updateDimensions)
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
        <ChatRoomList
          chatRooms={chatRooms}
          currRoomId={currRoomId}
          username={username}
          height={this.state.height}
          onItemClick={(roomId) => {
            actions.chatRoom.selectChatRoom(roomId)
            actions.messageLoad.load(roomId, 0)
          }} />

        <MessageView
          height={this.state.height}
          messages={messages}
          username={username} />

        <MessageInput
          currChatRoom={currChatRoom}
          onTextEdit={(ev, text) => actions.currentMessage.editText(text)} />
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
