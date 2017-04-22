/* @flow */
'use strict'

import es6Promise from 'es6-promise'
import Promise from 'bluebird'
import fetch from 'isomorphic-fetch'

import type { Profile } from './types'

es6Promise.polyfill()

const error = (error) => {
  console.log(error)
  return null
}

const responseJson = (response) => {
  if (response.status >= 400) {
    throw new Error('Bad response from server')
  }
  return response.json()
}

const responseAny = (response) => {
  if (response.status >= 400) {
    throw new Error('Bad response from server')
  }
  return response
}

export function signIn (
  username: string,
  password: string
): Promise<any> {
  return fetch('/api/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: username,
      password
    })
  })
  .then(responseAny)
  .catch(error)
}

export function signOut (): Promise<any> {
  fetch('/api/auth', {
    method: 'DELETE'
  })
  .then(responseAny)
  .catch(error)
}

export function getProfileInfo (): Promise<any> {
  fetch('/api/profile')
    .then(responseJson)
    .catch(error)
}

export function updateProfileInfo (
  profile: Profile
): Promise<any> {
  fetch('/api/profile', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(profile)
  })
  .then(responseJson)
  .catch(error)
}
