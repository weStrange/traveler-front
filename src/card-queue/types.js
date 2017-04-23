/* @flow */
'use strict'

import { List } from 'immutable'

import type { Profile } from '../core/types'

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

export type CardQueueState = {
  personalCards: List<PersonalCard>,
  groupCards: List<GroupCard>
}
