/* @flow */
// eslint-disable no-unused-vars
'use strict'

import MuiAppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actionCreators from '../../core/action-creators'

type AppBarProps = {
  title: string,
  menuIconCallback: (e: any) => void,
  signout: () => void,
  actions: any
}

export class AppBar extends Component {
  props: AppBarProps
  render () {
    return (
      <div>
        <MuiAppBar
          title={this.props.title}
          onLeftIconButtonTouchTap={() => this.props.menuIconCallback()}
          iconElementRight={
            <FlatButton
              label='Signout'
              onTouchTap={e => this.props
                .actions
                .singout
                .signout()} />
          }
        />
      </div>
    )
  }
}

export default connect(
  () => {},
  (dispatch) => ({
    actions: {
      singout: bindActionCreators(actionCreators.signoutActions, dispatch)
    }
  })
)(AppBar)
