/* @flow */
'use strict'

import React from 'react'
import TextField from 'material-ui/TextField'
import AutoComplete from 'material-ui/AutoComplete'
import DatePicker from 'material-ui/DatePicker'
import RaisedButton from 'material-ui/RaisedButton'

import { List } from 'immutable'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { red500, green500, orange500 } from 'material-ui/styles/colors'
import {
  Grid,
  Col,
  Row
} from 'react-bootstrap'

import { RadioGroup } from '../../core/components'

import * as actionCreators from '../action-creators'

import type { SignUpState } from '../types'

const _getErrorStyle = (
  isError: boolean
) => {
  return {
    color: (isError) ? red500 : green500
  }
}
const _getErrorMessage = (
  isError: boolean
) => {
  if (isError) return 'Password Mismatched'
  return 'Password matched'
}

type SignupProps = {
  autocompleteCountry: List<string>,
  autocompleteCity: List<string>,
  signupInput: SignUpState,
  actions: any
}

class Signup extends React.PureComponent {
  props: SignupProps

  constructor (props) {
    super(props)

    props.actions.city.load()
    props.actions.country.load()
  }

  passwordChecker () {
    const updater = (prev, props) => {
      return {passwordMismatch: prev.confirmpassword !== prev.password}
    }
    this.setState(updater, this.forceUpdate)
  }
  _removeMismatchedPasswordWarning () {
    const updater = (prev, props) => {
      return {passwordMismatch: undefined}
    }
    this.setState(updater, this.forceUpdate)
  }
  render () {
    const {
      autocompleteCountry,
      autocompleteCity,
      signupInput,
      actions
    } = this.props
    const {
      username,
      password,
      passwordRepeat,
      email,
      firstName,
      lastName,
      gender,
      birth,
      // phone,
      // address,
      city,
      country
    } = signupInput

    let isError = !doPasswordsMatch(password, passwordRepeat)

    return (
      <Grid>
        <Row>
          <Col sm={12} smOffset={0} md={6} mdOffset={3} lg={4} lgOffset={4}>
            <div style={{ marginLeft: '40%' }}>
              <TextField
                hintText='John'
                value={firstName}
                onChange={(e, value) => actions.signupInput.editFirstName(value)}
              /> <br />
              <TextField
                hintText='John'
                value={lastName}
                onChange={(e, value) => actions.signupInput.editLastName(value)}
              /> <br />
              <TextField
                hintText='Username'
                value={username}
                onChange={(e, value) => actions.signupInput.editUsername(value)}
              /> <br />
              <TextField
                type='email'
                hintText='john.doe@example.com'
                value={email}
                onChange={(e, value) => actions.signupInput.editEmail(value)}
              /> <br />
              <DatePicker
                hintText='Date of Birth'
                mode='landscape'
                value={birth}
                onChange={(ev, date) => actions.signupInput.editBirth(date)}
              /> <br />
              <RadioGroup
                onChange={(value) => actions.signupInput.editGender(value)}
                value={gender}
                options={[
                  {
                    label: 'Male',
                    value: 'male'
                  },
                  {
                    label: 'Female',
                    value: 'female'
                  },
                  {
                    label: 'Other',
                    value: 'other'
                  }
                ]}
                title='Gender'
                name='gender'
              /> <br />
              <AutoComplete
                disableFocusRipple
                value={country}
                onUpdateInput={(seachText) => actions.signupInput.editCountry(seachText)}
                hintText='Home country'
                dataSource={autocompleteCountry}
              /> <br />
              <AutoComplete
                hintText='Home city'
                value={city}
                onUpdateInput={(seachText) => actions.signupInput.editCity(seachText)}
                dataSource={autocompleteCity}
              /> <br />
              <TextField
                value={password}
                errorText={_getErrorMessage(isError)}
                errorStyle={_getErrorStyle(isError)}
                type='Password'
                hintText='Password'
                floatingLabelText='Password'
                floatingLabelStyle={_getErrorStyle(isError)}
                onChange={(e, value) => {
                  actions.signupInput.editPassword(value)
                  this._removeMismatchedPasswordWarning()
                }}
              /> <br />
              <TextField
                value={passwordRepeat}
                errorText={_getErrorMessage(isError)}
                errorStyle={_getErrorStyle(isError)}
                type='Password'
                hintText='Confirm password'
                floatingLabelText='Confirm password'
                floatingLabelStyle={_getErrorStyle(isError)}
                onChange={(e, value) => {
                  actions.signupInput.editPasswordRepeat(value)
                  this._removeMismatchedPasswordWarning()
                }}
                onBlur={() => {
                  this.passwordChecker()
                }}
              />

              <RaisedButton
                label='Log in'
                labelPosition='before'
                onClick={(ev) => actions.submit.submit()}
                backgroundColor={orange500}
              />
            </div>
          </Col>
        </Row>
      </Grid>
    )
  }
}

function doPasswordsMatch (
  password: string,
  passwordRepeat: string
): boolean {
  return password === passwordRepeat
}

function mapStateToProps (state) {
  return {
    ...state.signup,
    autocompleteCity: state.signup.city,
    autocompleteCountry: state.signup.country
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: {
      submit: bindActionCreators({
        ...actionCreators.signupSubmit
      }, dispatch),
      signupInput: bindActionCreators({
        ...actionCreators.signupInput
      }, dispatch),
      city: bindActionCreators({
        ...actionCreators.city
      }, dispatch),
      country: bindActionCreators({
        ...actionCreators.country
      }, dispatch)
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup)
