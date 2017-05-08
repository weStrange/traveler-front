/* @flow */
/* eslint-disable no-unused-vars */
'use strict'

import React from 'react'
import Paper from 'material-ui/Paper'
import Cardbg from '../../../img/cardbgempty.jpg'
import RaisedButton from 'material-ui/RaisedButton'
import muiThemeable from 'material-ui/styles/muiThemeable'
import { lightWhite, darkWhite, green300 } from 'material-ui/styles/colors'

import { Link } from 'react-router'

const style = {
  root: {
    position: 'fixed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    backgroundImage: `url(${Cardbg})`
  },
  h1: {
    fontWeight: '500',
    letterSpacing: '4px',
    textTransform: 'uppercase'
  },
  h4: {
    fontSize: '16px',
    fontWeight: '300',
    margin: '12px'
  },
  button: {
    padding: '0 12px',
    backgroundColor: green300
  },
  overlay: {
    textAlign: 'center',
    height: '100%',
    width: '100%',
    color: darkWhite,
    paddingTop: '70%',
    backgroundColor: 'rgba(0,0,0, 0.6)'
  }
}
class EmptyCard extends React.PureComponent {
  render () {
    return (
      <Paper zDepth={0} style={style.root}>
        <div style={style.overlay}>
          <h1 style={style.h1}>Oops!</h1>
          <h4 style={style.h4}>Looks like there are no one around at the moment</h4>
          <Link to='/map'>
            <RaisedButton
              style={style.button}
              backgroundColor={green300}
            >
                Back to Map
            </RaisedButton>
          </Link>
        </div>
      </Paper>
    )
  }
}
export default muiThemeable()(EmptyCard)
