/* @flow */
'use strict'

import { ProfileUtils } from '.'

import type {
  PersonalCard,
  PersonalCardPlain
} from '../types'

export function toPlain (
  card: PersonalCard
): PersonalCardPlain {
  return {
    id: card.id,
    startTime: card.startTime,
    endTime: card.endTime,
    lon: card.lon,
    lat: card.lat,
    owner: ProfileUtils.toPlain(card.owner)
  }
}

export function fromPlain (
  card: PersonalCardPlain
): PersonalCard {
  return {
    id: card.id,
    startTime: card.startTime,
    endTime: card.endTime,
    lon: card.lon,
    lat: card.lat,
    owner: ProfileUtils.fromPlain(card.owner)
  }
}
