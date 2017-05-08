/* @flow */
'use strict'

import React, { Component } from 'react'

import { List as ImmutList } from 'immutable'
import { List, ListItem } from 'material-ui/List'
import Chip from 'material-ui/Chip'

import type { Message } from '../../core/types'

type MessageViewProps = {
  messages: ImmutList<Message>,
  username: string
}

export default class MessageView extends Component {
  props: MessageViewProps;

  render () {
    const {
      messages,
      username
    } = this.props

    const styles = {
      chip: {
        margin: 4
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
        marginBottom: '100px'
      }}>
        {
          messages.map((p, i) => p.username === username
          ? (
            <ListItem
              style={{ height: '50px' }}
              key={i}>
              <Chip style={{...styles.chip, float: 'right'}}>
                {p.messageText}
              </Chip>
            </ListItem>
          )
          : (
            <ListItem
              style={{ height: '50px' }}
              key={i}>
              <Chip style={{...styles.chip, float: 'left'}}>
                {p.messageText}
              </Chip>
            </ListItem>
          ))
        }
      </List>
    )
  }
}
