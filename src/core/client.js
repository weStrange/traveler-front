/* @flow */
/* global File */
/* global google */
/* global FormData */
'use strict'

import es6Promise from 'es6-promise'
import Promise from 'bluebird'
import fetch from 'isomorphic-fetch'

import { List } from 'immutable'

import {
  GroupCardUtils,
  PersonalCardUtils,
  ProfileUtils,
  MatchResponseUtils,
  GoogleUtils
} from './type-methods'

import type {
  Profile,
  SignUpRequest,
  ProfileUpdateRequest,
  PersonalCard,
  GroupCard,
  PersonalCardShort,
  GroupCardShort,
  MatchResponse,
  GooglePlace,
  GooglePlacePlain,
  GooglePlaceDetails
} from './types'

es6Promise.polyfill()
/*
const error = (error) => {
  console.log(error)
  return null
}
*/
const responseJson = (response) => {
  console.log('respnse', response)
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

const credentialsType = 'same-origin'

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
    }),
    credentials: credentialsType
  })
  .then(responseAny)
  // // .catch(error)
}

export function signOut (): Promise<any> {
  return fetch('/api/auth', {
    method: 'DELETE',
    credentials: credentialsType
  })
  .then(responseAny)
  // // .catch(error)
}

export function signUp (request: SignUpRequest): Promise<any> {
  return fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request),
    credentials: credentialsType
  })
    .then(responseAny)
    // // .catch(error)
}

export function deleteAccount (): Promise<any> {
  return fetch('/api/users', {
    method: 'DELETE',
    credentials: credentialsType
  })
    .then(responseAny)
    // .catch(error)
}

export function getProfileInfo (): Promise<Profile> {
  return fetch('/api/profile', {
    credentials: credentialsType
  })
    .then(responseJson)
    .then(ProfileUtils.fromPlain)
    // .catch(error)
}

export function updateProfileInfo (
  profile: ProfileUpdateRequest
): Promise<Profile> {
  return fetch('/api/profile', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(profile),
    credentials: credentialsType
  })
  .then(responseJson)
  .then(ProfileUtils.fromPlain)
  // .catch(error)
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
    }),
    credentials: credentialsType
  })
    .then(responseAny)
    // .catch(error)
}

export function uploadProfilePhoto (
  photo: File
): Promise<Profile> {
  let formData = new FormData()

  formData.append('file', photo)

  return fetch('/api/profile/photos', {
    method: 'POST',
    body: formData,
    credentials: credentialsType
  })
    .then(responseJson)
    .then(ProfileUtils.fromPlain)
    // .catch(error)
}

export function uploadCardPhoto (
  cardId: number,
  photo: File
): Promise<any> {
  let formData = new FormData()

  formData.append('file', photo)

  return fetch('/api/profile/card-photos/' + cardId, {
    method: 'POST',
    body: formData,
    credentials: credentialsType
  })
    .then(responseAny)
    // .catch(error)
}

export function getImage (
  oid: number
): Promise<File> {
  return fetch('/api/images/' + oid, {
    credentials: credentialsType
  })
    .then(responseAny)
    // .catch(error)
}

export function getOwnPersonalCards (): Promise<List<PersonalCard>> {
  return fetch('/api/profile/personal-cards', {
    credentials: credentialsType
  })
    .then(responseJson)
    .then((cs) => List(cs).map(PersonalCardUtils.fromPlain))
    // .catch(error)
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
    body: JSON.stringify(card),
    credentials: credentialsType
  })
    .then(responseJson)
    .then(PersonalCardUtils.fromPlain)
    // .catch(error)
}

export function deletePersonalCard (
  id: number
): Promise<PersonalCard> {
  return fetch('/api/profile/personal-cards/' + id, {
    method: 'DELETE',
    credentials: credentialsType
  })
    .then(responseJson)
    .then(PersonalCardUtils.fromPlain)
    // .catch(error)
}

export function getOwnGroupCards (): Promise<List<GroupCard>> {
  return fetch('/api/profile/group-cards', {
    credentials: credentialsType
  })
    .then(responseJson)
    .then((cs) => List(cs).map(GroupCardUtils.fromPlain))
    // .catch(error)
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
    body: JSON.stringify(GroupCardUtils.shortToPlain(card)),
    credentials: credentialsType
  })
    .then(responseJson)
    .then(GroupCardUtils.fromPlain)
    // .catch(error)
}

export function deleteGroupCard (
  id: number
): Promise<GroupCard> {
  return fetch('/api/profile/group-cards/' + id, {
    method: 'DELETE',
    credentials: credentialsType
  })
    .then(responseJson)
    .then(GroupCardUtils.fromPlain)
    // .catch(error)
}

export function getPersonalCards (
  lat: number,
  lon: number,
  offset?: number = 0,
  includeArchived?: boolean = false
): Promise<List<PersonalCard>> {
  return fetch(
    '/api/personal-cards?lat=' + lat +
    '&lng=' + lon +
    '&includeArchived=' + (includeArchived ? 'true' : 'false') +
    '&offset=' + offset, {
      credentials: credentialsType
    }
  )
    .then(responseJson)
    .then((cs) => List(cs).map(PersonalCardUtils.fromPlain))
    // .catch(error)
}

export function getPersonalCardById (
  id: number
): Promise<PersonalCard> {
  return fetch('/api/personal-cards/' + id, {
    credentials: credentialsType
  })
    .then(responseJson)
    .then(PersonalCardUtils.fromPlain)
    // .catch(error)
}

export function createPersonalCard (
  card: PersonalCardShort
): Promise<PersonalCard> {
  return fetch('/api/personal-cards', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(card),
    credentials: credentialsType
  })
    .then(responseJson)
    .then(PersonalCardUtils.fromPlain)
    // .catch(error)
}

export function getGroupCards (
  lat: number,
  lon: number,
  offset?: number = 0,
  includeArchived?: boolean = false
): Promise<List<GroupCard>> {
  return fetch('/api/group-cards?lat=' + lat +
    '&lng=' + lon +
    '&includeArchived=' + (includeArchived ? 'true' : 'false') +
    '&offset=' + offset, {
      credentials: credentialsType
    }
  )
    .then(responseJson)
    .then((cs) => List(cs).map(GroupCardUtils.fromPlain))
    // .catch(error)
}

export function getGroupCardById (
  id: number
): Promise<GroupCard> {
  return fetch('/api/group-cards/' + id, {
    credentials: credentialsType
  })
    .then(responseJson)
    .then(GroupCardUtils.fromPlain)
    // .catch(error)
}

export function createGroupCard (
  card: GroupCardShort
): Promise<GroupCard> {
  return fetch('/api/group-cards', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(GroupCardUtils.shortToPlain(card)),
    credentials: credentialsType
  })
    .then(responseJson)
    .then(GroupCardUtils.shortFromPlain)
    // .catch(error)
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
    targetId, {
      method: 'PUT',
      credentials: credentialsType
    }
  )
    .then(responseJson)
    .then((p) => p.matched)
    // .catch(error)
}

export function isMatch (
  ownId: number,
  targetId: number
): Promise<boolean> {
  return fetch('/api/profile/cards/' + ownId + '/' + targetId, {
    credentials: credentialsType
  })
    .then(responseJson)
    .then((p) => p.matched)
    // .catch(error)
}

export function getMatches (
  ownId: number
): Promise<MatchResponse> {
  return fetch('/api/profile/cards/matches/' + ownId, {
    credentials: credentialsType
  })
    .then(responseJson)
    .then(MatchResponseUtils.fromPlain)
    // .catch(error)
}

export function getGooglePlacesPlain (
  search: string,
  lat: number,
  lon: number,
  zoom: number,
  type?: string
): Promise<Array<GooglePlacePlain>> {
  // $FlowIgnore
  let GoogleAutocomplete = new google.maps.places.AutocompleteService()

  let queryObject = {
    input: search,
    location: new google.maps.LatLng(lat, lon),
    radius: zoomToRadius(zoom)
  }
  if (type) {
    queryObject[type] = type
  }

  return new Promise((resolve, reject) => {
    GoogleAutocomplete.getPlacePredictions(queryObject, resolve)
  })
}

export function getGooglePlaces (
  search: string,
  lat: number,
  lon: number,
  zoom: number,
  type?: string
): Promise<List<GooglePlace>> {
  return getGooglePlacesPlain(search, lat, lon, zoom, type)
    .then((p) => List(p).map(GoogleUtils.placeFromPlain))
}

export function getGoogleCities (
  search: string
): Promise<List<GooglePlace>> {
  return getGooglePlaces(search, 0, 0, 0, 'cities')
}

export function getGooglePlaceDetails (
  placeId: string
) :Promise<GooglePlaceDetails> {
  // $FlowIgnore
  let PlacesService = new google.maps.places.PlacesService(document.getElementById('map'))

  return new Promise((resolve, reject) => {
    PlacesService.getDetails({
      placeId: placeId
    }, resolve)
  })
}

export function getGooglePlaceByLocation (
  lat: number,
  lng: number
): Promise<GooglePlaceDetails | null> {
  // $FlowIgnore
  let PlaceService = new google.maps.places.PlacesService(document.getElementById('map'))

  return (
    new Promise((resolve, reject) => {
      PlaceService.nearbySearch({
        location: new google.maps.LatLng(lat, lng),
        radius: 500
      }, resolve)
    })
  )
  .then((p) => p.length > 0 ? p[0] : null)
}

export function getCountries (): Promise<List<string>> {
  // TODO: add interaction with Google API here
  return Promise.resolve(List.of(
    'Finland',
    'Sweden',
    'USA',
    'Russia',
    'Vietnam'
  ))
}

export function getCities (): Promise<List<string>> {
  // TODO: add interaction with Google API here
  return Promise.resolve(List.of(
    'Helsinki',
    'Stockholm',
    'NYC',
    'Moscow',
    'Hanoi',
    'Vaasa'
  ))
}

function zoomToRadius (zoom: number): number {
  // TODO: add math for zoom to radius transition here
  return zoom
}
