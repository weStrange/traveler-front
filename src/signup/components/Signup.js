/* @flow */
'use strict'

import React from 'react'
import Radium from 'radium'

import TextField from 'material-ui/TextField'
import AutoComplete from 'material-ui/AutoComplete'
import DatePicker from 'material-ui/DatePicker'
import RaisedButton from 'material-ui/RaisedButton'
import FormField from './FormField'
import { List } from 'immutable'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { red500, blue500, green500, orange500 } from 'material-ui/styles/colors'
import Settings from 'material-ui/svg-icons/action/settings'
import ThumbsUp from 'material-ui/svg-icons/action/thumb-up'
import Home from 'material-ui/svg-icons/action/home'
import Person from 'material-ui/svg-icons/social/person'
import Mail from 'material-ui/svg-icons/communication/mail-outline'
import Human from 'material-ui/svg-icons/action/accessibility'
import { RadioGroup } from '../../core/components'
import { handleFileUpload } from '../../map/components/CreateCardView'

import * as actionCreators from '../action-creators'

import type { SignUpState } from '../types'
import type { GooglePlace } from '../../core/types'

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
const styles = {
  root: {
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  formField: {
    backgroundColor: green500,
    width: '100%',
    height: '200px'
  },
  formHeader: {
    top: '10%',
    left: '10%'
  },
  formInput: {

  },
  button: {
    margin: 12
  },
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0
  }
}
type SignupProps = {
  autocompleteCountry: List<string>,
  autocompleteCity: List<GooglePlace>,
  signupInput: SignUpState,
  actions: any
};

class Signup extends React.PureComponent {
  props: SignupProps

  constructor (props) {
    super(props)

    props.actions.country.load()
  }

  componentWillUnmount () {
    this.props.actions.common.stop()
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
      // autocompleteCountry,
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
      // country,
      imageUrl
    } = signupInput

    let isError = !doPasswordsMatch(password, passwordRepeat)
    return (
      <div style={[styles.root]}>
        <div style={[styles.content]}>
          <FormField
            header='FIRST NAME'
            backgroundColor='#ffc400'
            subheader='Our name is iStrange, how about you, traveller?'
            icon={<Settings />}
          >
            <TextField
              hintText='John'
              value={firstName}
              onChange={(e, value) => actions.signupInput.editFirstName(value)}
              />
          </FormField>
          <FormField
            header='LAST NAME'
            backgroundColor={'#ff6f00'}
            subheader={`We'd love to get to know your family name, too!`}
            icon={<ThumbsUp />}
            >
            <TextField
              hintText='Doe'
              value={lastName}
              onChange={(e, value) => actions.signupInput.editLastName(value)}
            />
          </FormField>
          <FormField icon={<Person />} header='USER NAME' backgroundColor='#ff5722' subheader='Pick a cool nickname! It is your unique identity among other travellers'>
            <TextField
              hintText='Username'
              value={username}
              onChange={(e, value) => actions.signupInput.editUsername(value)}
                  />
          </FormField>
          <FormField icon={<Mail />} backgroundColor='#f44336' header='EMAIL' subheader='Your email will only be used for account rescue. We will not spam you. We promise!'>
            <TextField
              type='email'
              hintText='john.doe@example.com'
              value={email}
              onChange={(e, value) => actions.signupInput.editEmail(value)}
            />
          </FormField>
          <FormField backgroundColor='#1e88e5' header='DAY OF BIRTH' subheader={'You must be over 18 years old in order to participate in our services'}>
            <DatePicker
              hintText='Date of Birth'
              mode='landscape'
              value={birth}
              onChange={(ev, date) => actions.signupInput.editBirth(date)}
                  />
          </FormField>
          <FormField decorateChildren={false} header='GENDER' subheader='Let people know who you are' backgroundColor='#8bc34a' icon={<Human />}>
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
              title='GENDER'
              name='gender'
                  />
          </FormField>
          <FormField icon={<Home />} backgroundColor='#0d47a1' header='HOME CITY' subheader='Where do you originally live?'>
            <AutoComplete
              hintText='Home city'
              value={city}
              onUpdateInput={(seachText) => {
                actions.signupInput.editCity(seachText)
                actions.city.load(seachText)
              }}
              dataSource={autocompleteCity.map((p) => p.description).toArray()}
                 />
          </FormField>

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
                />
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
          <img src={imageUrl} />
          <RaisedButton
            label='Choose an Image'
            labelPosition='before'
            containerElement='label'
                >
            <input
              type='file'
              style={styles.exampleImageInput}
              onChange={(e) => handleFileUpload(
                      e,
                      actions.signupInput.editImageFile,
                      actions.signupInput.editImageUrl
                    )} />
          </RaisedButton>

          <RaisedButton
            label='Sign up'
            labelPosition='before'
            onClick={(ev) => actions.submit.submit()}
            backgroundColor={orange500}
                />
        </div>
      </div>
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
      }, dispatch),
      common: bindActionCreators({
        ...actionCreators.common
      }, dispatch)
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Radium(Signup))
