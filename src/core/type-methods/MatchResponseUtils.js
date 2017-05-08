/* @flow */
'use strict'

import { List } from 'immutable'

import {
  GroupCardUtils,
  PersonalCardUtils
} from '.'

import type {
  MatchResponse,
  MatchResponsePlain
} from '../types'

export function toPlain (
  response: MatchResponse
): MatchResponsePlain {
  return {
    matchedPersonalCard: response.matchedPersonalCard
      .map(PersonalCardUtils.toPlain)
      .toArray(),
    matchedGroupCard: response.matchedGroupCard
      .map(GroupCardUtils.toPlain)
      .toArray()
  }
}

export function fromPlain (
  response: MatchResponsePlain
): MatchResponse {
  return {
    matchedPersonalCard: List(response.matchedPersonalCard)
      .map(PersonalCardUtils.fromPlain),
    matchedGroupCard: List(response.matchedGroupCard)
      .map(GroupCardUtils.fromPlain)
  }
}
