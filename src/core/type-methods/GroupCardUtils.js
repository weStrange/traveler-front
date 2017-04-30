/* @flow */
'use strict'

import { List } from 'immutable'

import { ProfileUtils } from '.'

import type {
  GroupCard,
  GroupCardPlain,
  GroupCardShort,
  GroupCardShortPlain
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
    owner: ProfileUtils.toPlain(card.owner),
    participants: card.participants.toArray()
  }
}

export function shortToPlain (
  card: GroupCardShort
): GroupCardShortPlain {
  return {
    id: card.id,
    startTime: card.startTime,
    endTime: card.endTime,
    lon: card.lon,
    lat: card.lat,
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
    owner: ProfileUtils.fromPlain(card.owner),
    participants: List(card.participants)
  }
}

export function shortFromPlain (
  card: GroupCardShortPlain
): GroupCardShort {
  return {
    id: card.id,
    startTime: card.startTime,
    endTime: card.endTime,
    lon: card.lon,
    lat: card.lat,
    participants: List(card.participants)
  }
}
