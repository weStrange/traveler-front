/* @flow */
'use strict'

import { List } from 'immutable'

import type {
  GroupCard,
  GroupCardPlain
} from '../types'

export function toPlain (
  card: GroupCard
): GroupCardPlain {
  return {
    id: card.id,
    startTime: card.startTime,
    endTime: card.endTime,
    lon: card.lon,
    lat: card.lat,
    owner: card.owner,
    participants: card.participants.toArray()
  }
}

export function fromPlain (
  card: GroupCardPlain
): GroupCard {
  return {
    id: card.id,
    startTime: card.startTime,
    endTime: card.endTime,
    lon: card.lon,
    lat: card.lat,
    owner: card.owner,
    participants: List(card.participants)
  }
}
