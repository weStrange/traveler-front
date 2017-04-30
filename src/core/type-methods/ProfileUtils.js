/* @flow */
'use strict'

import { List } from 'immutable'

import type {
  Profile,
  ProfilePlain
} from '../types'

export function toPlain (
  profile: Profile
): ProfilePlain {
  return {
    username: profile.username,
    firstName: profile.firstName,
    lastName: profile.lastName,
    gender: profile.gender,
    birth: profile.birth,
    email: profile.email,
    phone: profile.phone,
    address: profile.address,
    city: profile.city,
    country: profile.country,
    photos: profile.photos.toArray()
  }
}

export function fromPlain (
  profile: ProfilePlain
): Profile {
  return {
    username: profile.username,
    firstName: profile.firstName,
    lastName: profile.lastName,
    gender: profile.gender,
    birth: profile.birth,
    email: profile.email,
    phone: profile.phone,
    address: profile.address,
    city: profile.city,
    country: profile.country,
    photos: List(profile.photos)
  }
}
