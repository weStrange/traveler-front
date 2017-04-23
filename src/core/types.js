/* @flow */
'use strict'

import { List } from 'immutable'

export type Profile = {
  username: string,
  firstName: string,
  lastName: string,
  gender: string,
  birth: string,
  email: string,
  phone: string,
  address: string,
  city: string,
  country: string
}

export type ProfileUpdateRequest = {
  firstName: string,
  lastName: string,
  gender: string,
  birth: string,
  email: string,
  phone: string,
  address: string,
  city: string,
  country: string
}

export type SignUpRequest = {
  username: string,
  password: string,
  firstName: string,
  lastName: string,
  gender: string,
  birth: string,
  email: string,
  phone: string,
  address: string,
  city: string,
  country: string
}

export type PersonalCard = {
  id: number,
  startTime: number,
  endTime: number,
  lon: number,
  lat: number,
  owner: Profile
}

export type GroupCard = {
  id: number,
  startTime: number,
  endTime: number,
  lon: number,
  lat: number,
  owner: Profile,
  participants: List<string>
}

export type GroupCardPlain = {
  id: number,
  startTime: number,
  endTime: number,
  lon: number,
  lat: number,
  owner: Profile,
  participants: Array<string>
}
