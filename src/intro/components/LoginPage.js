/* @flow */
/* global KeyboardEvent */
'use strict'

import React, { Component } from 'react'

import TextField from 'material-ui/TextField'
import img from '../../../img/bg2.jpg'
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import { darkWhite, fullWhite, orange500 } from 'material-ui/styles/colors'

import * as actionCreators from '../action-creators'

import type { AppState } from '../../types'

const BackGround = ({ children, image }) => {
  const childStyle = children.props.style
  const newStyle = {
    ...childStyle,
    position: 'absolute',
    bottom: '13%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '30%',
    paddingLeft: 'auto',
    paddingRight: 'auto'
  }
  const newChild = { ...children, props: { ...children.props, style: newStyle } }
  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        backgroundPosition: 'center',
        height: '100vh',
        width: '100vw'
      }}
    >
      { newChild }
    </div>
  )
}

type LoginPageProps = {
  username: string,
  password: string,
  actions: any
}

export class LoginPage extends Component {
  props: LoginPageProps;
  _keyboardHandler: (ev: KeyboardEvent) => void

  _keyboardHandler (ev: KeyboardEvent) {
    if (ev.keyCode === 13) {
      this.props.actions.submit.submit()
    }
  }

  constructor (props: LoginPageProps) {
    super(props)

    this._keyboardHandler = this._keyboardHandler.bind(this)
  }

  componentDidMount () {
    window.addEventListener('keydown', this._keyboardHandler)
  }

  componentWillUnmount () {
    this.props.actions.input.stop()

    window.removeEventListener('keydown', this._keyboardHandler)
  }

  render () {
    const {
      username,
      password,
      actions
    } = this.props

    return (
      <BackGround image={img}>
        <div>
          <TextField
            hintText='Username'
            onChange={(ev) => actions.input.editUsername(ev.target.value)}
            value={username}
            fullWidth
            hintStyle={{
              color: darkWhite
            }}
            inputStyle={{
              color: fullWhite
            }}
            type='text'
            underlineFocusStyle={{
              borderColor: orange500
            }}
            errorText=''
          />
          <br />
          <TextField
            hintText='Password'
            onChange={(ev) => actions.input.editPassword(ev.target.value)}
            value={password}
            fullWidth
            hintStyle={{
              color: darkWhite
            }}
            inputStyle={{
              color: fullWhite
            }}
            type='password'
            underlineFocusStyle={{
              borderColor: orange500
            }}
            errorText=''
          />
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: '26px'
          }}>
            <Link to='/signup'>
              <FlatButton
                style={{ color: darkWhite, fontWeight: '200' }}
              >
                <span>Sign up</span>
              </FlatButton>
            </Link>

            <RaisedButton
              label='Log in'
              labelPosition='before'
              onClick={(ev) => actions.submit.submit()}
              icon={<ArrowForward />}
              backgroundColor={orange500}
            />
          </div>
        </div>
      </BackGround>
    )
  }
}

function mapStateToProps (state: AppState) {
  return {
    ...state.login
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: {
      submit: bindActionCreators({
        ...actionCreators.loginSubmit
      }, dispatch),
      input: bindActionCreators({
        ...actionCreators.loginInput
      }, dispatch)
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage)
