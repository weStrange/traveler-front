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
  country: string,
  photos: List<number>
}

export type ProfilePlain = {
  username: string,
  firstName: string,
  lastName: string,
  gender: string,
  birth: string,
  email: string,
  phone: string,
  address: string,
  city: string,
  country: string,
  photos: Array<number>
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
  birth: number,
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

export type PersonalCardPlain = {
  id: number,
  startTime: number,
  endTime: number,
  lon: number,
  lat: number,
  owner: ProfilePlain
}

export type PersonalCardShort = {
  id: number,
  startTime: number,
  endTime: number,
  lon: number,
  lat: number,
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
  owner: ProfilePlain,
  participants: Array<string>
}

export type GroupCardShort = {
  id: number,
  startTime: number,
  endTime: number,
  lon: number,
  lat: number,
  participants: List<string>
}

export type GroupCardShortPlain = {
  id: number,
  startTime: number,
  endTime: number,
  lon: number,
  lat: number,
  participants: Array<string>
}

export type MatchResponse = {
  matchedPersonalCard: List<PersonalCard>,
  matchedGroupCard: List<GroupCard>
}

export type MatchResponsePlain = {
  matchedPersonalCard: Array<PersonalCardPlain>,
  matchedGroupCard: Array<GroupCardPlain>
}
