/* @flow */
'use strict'

import React from 'react'
import Radium from 'radium'
import stockAvatar from '../../../img/stockavatar.jpg'

import TextField from 'material-ui/TextField'
import AutoComplete from 'material-ui/AutoComplete'
import DatePicker from 'material-ui/DatePicker'
import RaisedButton from 'material-ui/RaisedButton'
import FormField from './FormField'
import { List } from 'immutable'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { red300, green300, orange500 } from 'material-ui/styles/colors'
import Settings from 'material-ui/svg-icons/action/settings'
import ThumbsUp from 'material-ui/svg-icons/action/thumb-up'
import Home from 'material-ui/svg-icons/action/home'
import Person from 'material-ui/svg-icons/social/person'
import Mail from 'material-ui/svg-icons/communication/mail-outline'
import Human from 'material-ui/svg-icons/action/accessibility'
import Lock from 'material-ui/svg-icons/action/lock'
import Face from 'material-ui/svg-icons/action/face'
import { RadioGroup } from '../../core/components'
import { handleFileUpload } from '../../map/components/CreateCardView'

import * as actionCreators from '../action-creators'

import type { SignUpState } from '../types'
import type { GooglePlace } from '../../core/types'

const _getErrorStyle = (
  isError: boolean
) => {
  return {
    color: (isError) ? red300 : green300
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
    backgroundColor: green300,
    width: '100%',
    height: '200px'
  },
  formHeader: {
    top: '10%',
    left: '10%'
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
  },
  avatarPreview: {
    width: '70%',
    height: '80%',
    backgroundSize: 'cover',
    marginBottom: '24px'
  }
}

type SignupProps = {
  autocompleteCountry: List<string>,
  autocompleteCity: List<GooglePlace>,
  signupInput: SignUpState,
  actions: any
}

type SignupState = {
  open: number
}

class Signup extends React.PureComponent {
  props: SignupProps;
  state: SignupState;

  constructor (props) {
    super(props)
    this.state = { open: 0 }
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
            open={this.state.open === 0}
            onHandlerClick={() => this.setState({ open: 0 })}
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
            open={this.state.open === 1}
            onHandlerClick={() => this.setState({ open: 1 })}
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
          <FormField
            open={this.state.open === 2}
            onHandlerClick={() => this.setState({ open: 2 })}
            icon={<Mail />} backgroundColor='#f44336' header='EMAIL' subheader='Your email will only be used for account rescue. We will not spam you. We promise!'>
            <TextField
              type='email'
              hintText='john.doe@example.com'
              value={email}
              onChange={(e, value) => actions.signupInput.editEmail(value)}
            />
          </FormField>
          <FormField
            open={this.state.open === 3}
            onHandlerClick={() => this.setState({ open: 3 })}
            backgroundColor='#1e88e5' header='DAY OF BIRTH' subheader={'You must be over 18 years old in order to participate in our services'}>
            <DatePicker
              hintText='Date of Birth'
              mode='landscape'
              value={birth}
              onChange={(ev, date) => actions.signupInput.editBirth(date)}
                  />
          </FormField>
          <FormField
            open={this.state.open === 4}
            onHandlerClick={() => this.setState({ open: 4 })}
            decorateChildren={false} header='GENDER' subheader='Let people know who you are' backgroundColor='#8bc34a' icon={<Human />}>
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
          <FormField
            open={this.state.open === 5}
            onHandlerClick={() => this.setState({ open: 5 })}
            icon={<Home />} backgroundColor='#0d47a1' header='HOME CITY' subheader='Where do you originally live?'>
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
          <FormField
            open={this.state.open === 6}
            onHandlerClick={() => this.setState({ open: 6 })}
            icon={<Person />} header='USER NAME' backgroundColor='#ff5722' subheader='Pick a cool nickname! It is your unique identity among other travellers'>
            <TextField
              hintText='Username'
              value={username}
              onChange={(e, value) => actions.signupInput.editUsername(value)}
                  />
          </FormField>
          <FormField
            open={this.state.open === 7}
            onHandlerClick={() => this.setState({ open: 7 })}
            icon={<Lock />} backgroundColor={isError ? '#c62828' : '#2e7d32'} header='PASSWORD' subheader='Remember to use a strong password!'>
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
          </FormField>

          <FormField
            onHandlerClick={() => this.setState({ open: 8 })}
            open={this.state.open === 8}
            icon={<Face />} decorateChildren={false} backgroundColor='#607d8b' header='AVATAR' subheader='Choose your avatar. A clear picture will definately help!'>
            <div style={[styles.avatarPreview, {backgroundImage: `url('${imageUrl || stockAvatar}')`}]} />
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
          </FormField>

          <FormField
            onHandlerClick={() => { this.setState({ open: 9 }); this.forceUpdate() }}
            open={this.state.open === 9}
            decorateChildren={false} backgroundColor='#757575' header="YOU'RE SET TO GO!" subheader='Just click the button below. Welcome to TravelMateFinder!' >

            <RaisedButton
              label='Sign up'
              labelPosition='before'
              onClick={(ev) => actions.submit.submit()}
              backgroundColor={orange500}
              fullWidth
                  />
          </FormField>
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
