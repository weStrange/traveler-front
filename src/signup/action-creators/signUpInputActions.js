/* @flow */
'use strict'

import type { Action } from '../../actions'
import type { Gender } from '../types'

export function editUsername (username: string): Action {
  return {
    type: 'signup-username-edit',
    username: username
  }
}

export function editPassword (password: string): Action {
  return {
    type: 'signup-password-edit',
    password: password
  }
}

export function editPasswordRepeat (password: string): Action {
  return {
    type: 'signup-password-repeat-edit',
    password: password
  }
}

export function editEmail (email: string): Action {
  return {
    type: 'signup-email-edit',
    email: email
  }
}

export function editFirstName (firstName: string): Action {
  return {
    type: 'signup-first-name-edit',
    firstName: firstName
  }
}

export function editLastName (lastName: string): Action {
  return {
    type: 'signup-last-name-edit',
    lastName: lastName
  }
}

export function editGender (gender: Gender): Action {
  return {
    type: 'signup-gender-edit',
    gender: gender
  }
}

export function editBirth (birth: Date): Action {
  return {
    type: 'signup-birth-edit',
    birth: birth
  }
}

export function editPhone (phone: string): Action {
  return {
    type: 'signup-phone-edit',
    phone: phone
  }
}

export function editCity (city: string): Action {
  return {
    type: 'signup-city-edit',
    city: city
  }
}

export function editCountry (country: string): Action {
  return {
    type: 'signup-country-edit',
    country: country
  }
}
