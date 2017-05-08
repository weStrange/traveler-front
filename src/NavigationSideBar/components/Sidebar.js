// @flow
/* eslint-disable no-unused-vars */

'use strict'

import React, { Component } from 'react'
import muiThemeable from 'material-ui/styles/muiThemeable'
import Drawer from 'material-ui/Drawer'
import ProfileFrame from './ProfileFrame'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import _each from 'lodash/each'
import _map from 'lodash/map'
import _isUndefined from 'lodash/isUndefined'
import img from '../../../img/profilebackground.jpg'
import { darkWhite } from 'material-ui/styles/colors'

import { oidToUrl } from '../../core/photo-utils'

type SidebarProps = {
  items: Array<any>, // substitute this with your accurate type
  open: boolean,
  muiTheme: any, // no need to care for this
  onRequestChange: () => void,
  imageUrl: string,
  avatarImg: number,
  username: string,
  useremail: string
}

class Sidebar extends Component {
  props: SidebarProps;
  colorize (element) {
    if (!element) return
    let { props } = element
    let newProps = { ...props, color: this.props.muiTheme.palette.primary1Color }
    return {...element, props: newProps}
  }
  renderItems = (items) => {
    const subheaderIndexes = []
    const ListItems = _map(
      items,
      (item, index) => {
        if (item.subheader) subheaderIndexes.push(index)
        return (<ListItem
          key={index}
          disabled={item.disabled}
          primaryText={item.label}
          leftIcon={this.colorize(item.leftIcon)}
          onTouchTap={(e) => item.onTouchTap(e)}
          primaryTogglesNestedList
          nestedItems={!_isUndefined(item.subItems) && this.renderItems(item.subItems)} // recursive call for sub items
        />)
      }
    )
    _each(subheaderIndexes, (index, iterationTimes) => {
      ListItems.splice(
        index + iterationTimes,
        0,
        <Subheader key={'subheader-' + index}>
          {items[index].subheaderLabel}
        </Subheader>
      )
    })
    return ListItems
  }

  render () {
    return (
      <div
        style={{overflow: 'hidden'}}
      >
        <Drawer
          open={this.props.open}
          docked={false}
          onRequestChange={this.props.onRequestChange}
          zDepth={3}
          width={'80%'}
        >
          <ProfileFrame
            imgUrl={this.props.imageUrl}
            avatarImgUrl={
              this.props.avatarImg === undefined
              ? this.props.avatarImg
              : oidToUrl(this.props.avatarImg)
            }
            primaryText={this.props.username}
            secondaryText={this.props.useremail}
            primaryTextStyle={{color: this.props.muiTheme.palette.primary1Color}}
          />
          <List>
            {
              this.renderItems(this.props.items)
            }
          </List>
        </Drawer>
      </div>
    )
  }
}

export default muiThemeable()(Sidebar)
