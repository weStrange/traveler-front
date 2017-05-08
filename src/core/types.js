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
  title: string,
  description: string,
  startTime: Date,
  endTime: Date,
  lon: number,
  lat: number,
  owner: Profile,
  photos: List<number>
}

export type PersonalCardPlain = {
  id: number,
  title: string,
  description: string,
  startTime: Date,
  endTime: Date,
  longitude: number,
  latitude: number,
  owner: ProfilePlain,
  photos: Array<number>
}

export type PersonalCardShort = {
  title: string,
  description: string,
  startTime: Date,
  endTime: Date,
  lon: number,
  lat: number,
}

export type GroupCard = {
  id: number,
  title: string,
  description: string,
  startTime: Date,
  endTime: Date,
  lon: number,
  lat: number,
  owner: Profile,
  participants: List<string>,
  photos: List<number>
}

export type GroupCardPlain = {
  id: number,
  title: string,
  description: string,
  startTime: Date,
  endTime: Date,
  longitude: number,
  latitude: number,
  owner: ProfilePlain,
  participants: Array<string>,
  photos: Array<number>
}

export type GroupCardShort = {
  title: string,
  description: string,
  startTime: Date,
  endTime: Date,
  lon: number,
  lat: number,
  participants: List<string>
}

export type GroupCardShortPlain = {
  title: string,
  description: string,
  startTime: Date,
  endTime: Date,
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

export type Location = {
  lat: number,
  lon: number
}

export type GoogleLocation = {
  lat: number,
  lng: number
}

export type GoogleAPIStatus
  = 'OK'
  | 'ZERO_RESULTS'
  | 'OVER_QUERY_LIMIT'
  | 'REQUEST_DENIED'
  | 'INVALID_REQUEST'

export type GoogleTerm = {
  offset : number,
  value : string
}

export type MatchedSubstrings = {
   length: 5,
   offset: 0
}

export type GooglePlaceDetails = {
  name: string,
  place_id: string,
  geometry: {
    location: {
       lat: number,
       lng: number
     }
  }
}

export type GooglePlaceDetailsResponse = {
  result: GooglePlaceDetails,
  status: GoogleAPIStatus
}

export type GooglePlace = {
   description: string,
   id: string,
   matched_substrings: List<MatchedSubstrings>,
   place_id: string,
   reference: string,
   terms: List<GoogleTerm>,
   types : List<string>
}

export type GooglePlaceResponse = {
  predictions : List<GooglePlace>,
  status : GoogleAPIStatus
}

export type GooglePlacePlain = {
   description: string,
   id: string,
   matched_substrings: Array<MatchedSubstrings>,
   place_id: string,
   reference: string,
   terms: Array<GoogleTerm>,
   types : Array<string>
}

export type GooglePlaceResponsePlain = {
  predictions : Array<GooglePlacePlain>,
  status : GoogleAPIStatus
}

export type ChatRoom = {
  id: number,
  active: boolean,
  timestamp: Date,
  participants: List<Profile>
}

export type ChatRoomPlain = {
  id: number,
  active: boolean,
  timestamp: Date,
  participants: Array<ProfilePlain>
}

export type Message = {
  id: number,
  messageText: string,
  creationTime: Date,
  username: string,
  chatRoomId: number
}
