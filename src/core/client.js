/* @flow */
/* global File */
'use strict'

import es6Promise from 'es6-promise'
import Promise from 'bluebird'
import fetch from 'isomorphic-fetch'

import { List } from 'immutable'

import {
  GroupCardUtils,
  PersonalCardUtils,
  ProfileUtils,
  MatchResponseUtils
} from './type-methods'

import type {
  Profile,
  SignUpRequest,
  ProfileUpdateRequest,
  PersonalCard,
  GroupCard,
  PersonalCardShort,
  GroupCardShort,
  MatchResponse
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
  return fetch('/api/auth', {
    method: 'DELETE'
  })
  .then(responseAny)
  .catch(error)
}

export function signUp (request: SignUpRequest): Promise<any> {
  return fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
  })
    .then(responseAny)
    .catch(error)
}

export function deleteAccount (): Promise<any> {
  return fetch('/api/users', {
    method: 'DELETE'
  })
    .then(responseAny)
    .catch(error)
}

export function getProfileInfo (): Promise<Profile> {
  return fetch('/api/profile')
    .then(responseJson)
    .then(ProfileUtils.fromPlain)
    .catch(error)
}

export function updateProfileInfo (
  profile: ProfileUpdateRequest
): Promise<Profile> {
  return fetch('/api/profile', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(profile)
  })
  .then(responseJson)
  .then(ProfileUtils.fromPlain)
  .catch(error)
}

export function updatePassword (
  oldPassword: string,
  newPassword: string
): Promise<any> {
  return fetch('/api/profile/password', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      oldPassword,
      newPassword
    })
  })
    .then(responseAny)
    .catch(error)
}

export function uploadPhoto (
  photo: File
): Promise<Profile> {
  return fetch('/api/profile/photos', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    body: photo
  })
    .then(responseJson)
    .then(ProfileUtils.fromPlain)
    .catch(error)
}

export function getImage (
  oid: number
): Promise<File> {
  return fetch('/api/images/' + oid)
    .then(responseAny)
    .catch(error)
}

export function getOwnPersonalCards (): Promise<List<PersonalCard>> {
  return fetch('/api/profile/personal-cards')
    .then(responseJson)
    .then((cs) => List(cs).map(PersonalCardUtils.fromPlain))
    .catch(error)
}

export function updatePersonalCard (
  id: number,
  card: PersonalCardShort
): Promise<PersonalCard> {
  return fetch('/api/profile/personal-cards/' + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(card)
  })
    .then(responseJson)
    .then(PersonalCardUtils.fromPlain)
    .catch(error)
}

export function deletePersonalCard (
  id: number
): Promise<PersonalCard> {
  return fetch('/api/profile/personal-cards/' + id, {
    method: 'DELETE'
  })
    .then(responseJson)
    .then(PersonalCardUtils.fromPlain)
    .catch(error)
}

export function getOwnGroupCards (): Promise<List<GroupCard>> {
  return fetch('/api/profile/group-cards')
    .then(responseJson)
    .then((cs) => List(cs).map(GroupCardUtils.fromPlain))
    .catch(error)
}

export function updateGroupCard (
  id: number,
  card: GroupCardShort
): Promise<GroupCard> {
  return fetch('/api/profile/group-cards/' + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(GroupCardUtils.shortToPlain(card))
  })
    .then(responseJson)
    .then(GroupCardUtils.fromPlain)
    .catch(error)
}

export function deleteGroupCard (
  id: number
): Promise<GroupCard> {
  return fetch('/api/profile/group-cards/' + id, {
    method: 'DELETE'
  })
    .then(responseJson)
    .then(GroupCardUtils.fromPlain)
    .catch(error)
}

export function getPersonalCards (
  lat: number,
  lon: number,
  offset?: number = 0,
  includeArchived?: boolean = false
): Promise<List<PersonalCard>> {
  return fetch('/api/personal-cards')
    .then(responseJson)
    .then((cs) => List(cs).map(PersonalCardUtils.fromPlain))
    .catch(error)
}

export function getPersonalCardById (
  id: number
): Promise<PersonalCard> {
  return fetch('/api/personal-cards/' + id)
    .then(responseJson)
    .then(PersonalCardUtils.fromPlain)
    .then(error)
}

export function createPersonalCard (
  card: PersonalCardShort
): Promise<PersonalCard> {
  return fetch('/api/personal-cards', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(card)
  })
    .then(responseJson)
    .then(PersonalCardUtils.fromPlain)
    .catch(error)
}

export function getGroupCards (
  lat: number,
  lon: number,
  offset?: number = 0,
  includeArchived?: boolean = false
): Promise<List<GroupCard>> {
  return fetch('/api/group-cards')
    .then(responseJson)
    .then((cs) => List(cs).map(GroupCardUtils.fromPlain))
    .catch(error)
}

export function getGroupCardById (
  id: number
): Promise<GroupCard> {
  return fetch('/api/group-cards/' + id)
    .then(responseJson)
    .then(GroupCardUtils.fromPlain)
    .then(error)
}

export function createGroupCard (
  card: GroupCardShort
): Promise<GroupCard> {
  return fetch('/api/group-cards', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(GroupCardUtils.shortToPlain(card))
  })
    .then(responseJson)
    .then(GroupCardUtils.shortFromPlain)
    .catch(error)
}

export function evaluateCard (
  ownId: number,
  targetId: number,
  like: boolean
): Promise<boolean> {
  return fetch(
    '/api/profile/cards/' +
    ownId +
    '/' +
    (like ? 'like' : 'dislike') +
    '/' +
    targetId
  )
    .then(responseJson)
    .then((p) => p.matched)
    .catch(error)
}

export function isMatch (
  ownId: number,
  targetId: number
): Promise<boolean> {
  return fetch('/api/profile/cards/' + ownId + '/' + targetId)
    .then(responseJson)
    .then((p) => p.matched)
    .catch(error)
}

export function getMatches (
  ownId: number
): Promise<MatchResponse> {
  return fetch('/api/profile/cards/matches/' + ownId)
    .then(responseJson)
    .then(MatchResponseUtils.fromPlain)
    .catch(error)
}

export function getCountries (): Promise<List<string>> {
  // TODO: add interaction with back-end here
  return Promise.resolve(List.of(
    'Finland',
    'Sweden',
    'USA',
    'Russia',
    'Vietnam'
  ))
}

export function getCities (): Promise<List<string>> {
  // TODO: add interaction with back-end here
  return Promise.resolve(List.of(
    'Helsinki',
    'Stockholm',
    'NYC',
    'Moscow',
    'Hanoi',
    'Vaasa'
  ))
}
