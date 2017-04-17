/* @flow */
'use strict'

import type { Action } from '../../actions'
import type { ProfileEditState } from '../types'

function getDefaultState (): ProfileEditState {
  return {
    firstName: '',
    lastName: '',
    gender: '',
    birth: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: ''
  }
}

export default function profileEditReducer (
  state: ProfileEditState = getDefaultState(),
  action: Action
): ProfileEditState {
  switch (action.type) {
    case 'profile-first-name-edit':
      return {
        ...state,
        firstName: action.firstName
      }

    case 'profile-last-name-edit':
      return {
        ...state,
        lastName: action.lastName
      }

    case 'profile-age-edit':
      return {
        ...state,
        age: action.age
      }

    case 'profile-email-edit':
      return {
        ...state,
        email: action.email
      }

    case 'profile-gender-edit':
      return {
        ...state,
        gender: action.gender
      }

    default:
      return state
  }
}
