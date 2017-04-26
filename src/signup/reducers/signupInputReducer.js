/* @flow */
'use strict'
/* @flow */
'use strict'

import type { Action } from '../../actions'
import type { SignUpState } from '../types'

function getDefaultState (): SignUpState {
  return {
    username: '',
    password: '',
    passwordRepeat: '',
    email: '',
    gender: 'other',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: '',
    birth: new Date(),
    phone: ''
  }
}

export default function signupReducer (
  state: SignUpState = getDefaultState(),
  action: Action
): SignUpState {
  switch (action.type) {
    case 'signup-username-edit':
      return {
        ...state,
        username: action.username
      }

    case 'signup-password-edit':
      return {
        ...state,
        password: action.password
      }

    case 'signup-password-repeat-edit':
      return {
        ...state,
        passwordRepeat: action.password
      }

    case 'signup-email-edit':
      return {
        ...state,
        email: action.email
      }

    case 'signup-first-name-edit':
      return {
        ...state,
        firstName: action.firstName
      }

    case 'signup-last-name-edit':
      return {
        ...state,
        lastName: action.lastName
      }

    case 'signup-birth-edit':
      return {
        ...state,
        birth: action.birth
      }

    case 'signup-gender-edit':
      return {
        ...state,
        gender: action.gender
      }

    case 'signup-phone-edit':
      return {
        ...state,
        phone: action.phone
      }

    case 'signup-city-edit':
      return {
        ...state,
        city: action.city
      }

    case 'signup-country-edit':
      return {
        ...state,
        country: action.country
      }

    default:
      return state
  }
}
