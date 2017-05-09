/* @flow */
'use strict'

import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { List as ImmutList } from 'immutable'
import { List, ListItem } from 'material-ui/List'
import Chip from 'material-ui/Chip'

import type { Message } from '../../core/types'

type MessageViewProps = {
  messages: ImmutList<Message>,
  username: string,
  height: number
}

type MessageViewState = {
  width: number,
  height: number
}

export default class MessageView extends Component {
  props: MessageViewProps;
  state: MessageViewState;
  messagesEnd:any;
  shouldUpdate: boolean;
  scrollToBottom: () => void;

  constructor (props: MessageViewProps) {
    super(props)

    this.shouldUpdate = true
    this.scrollToBottom = this.scrollToBottom.bind(this)
  }

  scrollToBottom = () => {
    const node: any = ReactDOM.findDOMNode(this.messagesEnd)
    if (node) {
      node.scrollIntoView({behavior: 'smooth'})
    }
  }

  componentWillReceiveProps (newProps: MessageViewProps) {
    if (
      this.props.messages.size !== newProps.messages.size ||
      (
        !this.props.messages.isEmpty() && (
          this.props.messages.first().creationTime !==
            newProps.messages.first().creationTime ||
          this.props.messages.last().creationTime !==
            newProps.messages.last().creationTime
        )
      )
    ) {
      this.shouldUpdate = true
    }
  }

  componentDidMount () {
    this.scrollToBottom()
  }

  componentDidUpdate () {
    if (this.shouldUpdate) {
      this.shouldUpdate = false
      this.scrollToBottom()
    }
  }

  render () {
    const {
      messages,
      username,
      height
    } = this.props

    const styles = {
      chip: {
        margin: 4,
        maxWidth: '45%',
        height: '70px'
      },
      label: {
        whiteSpace: 'pre-line'
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap'
      }
    }

    return (
      <List style={{
        width: '70%',
        float: 'right',
        marginBottom: '100px',
        height: height,
        overflow: 'auto',
        margin: 0
      }}>
        {
          messages.map((p, i) => p.username === username
          ? (
            <ListItem
              disabled
              style={{ height: '50px' }}
              key={i}>
              <Chip
                labelStyle={styles.label}
                style={{...styles.chip, float: 'right'}}>
                {p.messageText}
              </Chip>
            </ListItem>
          )
          : (
            <ListItem
              labelStyle={styles.label}
              style={{ height: '50px' }}
              key={i}>
              <Chip style={{...styles.chip, float: 'left'}}>
                {p.messageText}
              </Chip>
            </ListItem>
          ))
        }
        <div style={{ float: 'left', clear: 'both' }}
          ref={(el) => { this.messagesEnd = el }} />
      </List>
    )
  }
}
