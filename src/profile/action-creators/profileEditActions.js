/* @flow */
'use strict'

import type { Action } from '../../actions'

export function editFirstName (firstName: string): Action {
  return {
    type: 'profile-first-name-edit',
    firstName: firstName
  }
}

export function editLastName (lastName: string): Action {
  return {
    type: 'profile-last-name-edit',
    lastName: lastName
  }
}

export function editEmail (email: string): Action {
  return {
    type: 'profile-email-edit',
    email: email
  }
}

export function editGender (gender: string): Action {
  return {
    type: 'profile-gender-edit',
    gender: gender
  }
}

export function editAge (age: number): Action {
  return {
    type: 'profile-age-edit',
    age: age
  }
}
