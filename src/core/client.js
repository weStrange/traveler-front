/* @flow */
'use strict'

import es6Promise from 'es6-promise'
import Promise from 'bluebird'
import fetch from 'isomorphic-fetch'

import { List } from 'immutable'

import { GroupCardUtils } from './type-methods'

import type {
  Profile,
  SignUpRequest,
  ProfileUpdateRequest,
  PersonalCard,
  GroupCard
} from './types'

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

export function singUp (request: SignUpRequest): Promise<any> {
  fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
  })
}

export function getProfileInfo (): Promise<Profile> {
  fetch('/api/profile')
    .then(responseJson)
    .catch(error)
}

export function updateProfileInfo (
  profile: ProfileUpdateRequest
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

export function getPersonalCards (
  lat: number,
  lon: number,
  offset?: number = 0,
  includeArchived?: boolean = false
): Promise<List<PersonalCard>> {
  fetch('/api/personal-cards')
    .then(responseJson)
    .then((cs) => List(cs))
    .catch(error)
}

export function getGroupCards (
  lat: number,
  lon: number,
  offset?: number = 0,
  includeArchived?: boolean = false
): Promise<List<GroupCard>> {
  fetch('/api/group-cards')
    .then(responseJson)
    .then((cs) => List(cs).map(GroupCardUtils.fromPlain))
    .catch(error)
}

export function evaluateCard (
  ownId: number,
  targetId: number,
  like: boolean
): Promise<any> {
  fetch(
    '/api/profile/cards/' +
    ownId +
    '/' +
    (like ? 'like' : 'dislike') +
    '/' +
    targetId
  ).then(responseAny)
    .catch(error)
}
