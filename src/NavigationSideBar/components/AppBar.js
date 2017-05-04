/* @flow */
// eslint-disable no-unused-vars
'use strict'

import MuiAppBar from 'material-ui/AppBar'
import React, { Component } from 'react'

type AppBarProps = {
  title: string,
  menuIconCallback: (e: any) => void
};
export default class AppBar extends Component {
  props: AppBarProps
  render () {
    return (
      <div>
        <MuiAppBar
          title={this.props.title}
          onLeftIconButtonTouchTap={() => this.props.menuIconCallback()}
        />
      </div>
    )
  }
}
