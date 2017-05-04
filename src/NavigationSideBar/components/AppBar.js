/* @flow */
// eslint-disable no-unused-vars
'use strict'

import MuiAppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import React, { Component } from 'react'

type AppBarProps = {
  title: string,
  menuIconCallback: (e: any) => void,
  signout: () => void
};
export default class AppBar extends Component {
  props: AppBarProps
  render () {
    return (
      <div>
        <MuiAppBar
          title={this.props.title}
          onLeftIconButtonTouchTap={() => this.props.menuIconCallback()}
          iconElementRight={<FlatButton label='Signout' onTouchTap={e => this.props.signout()} />}
        />
      </div>
    )
  }
}
