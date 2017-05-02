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
    title: card.title,
    description: card.description,
    startTime: card.startTime,
    endTime: card.endTime,
    longitude: card.lon,
    latitude: card.lat,
    owner: ProfileUtils.toPlain(card.owner),
    participants: card.participants.toArray(),
    photos: card.photos.toArray()
  }
}

export function shortToPlain (
  card: GroupCardShort
): GroupCardShortPlain {
  return {
    title: card.title,
    description: card.description,
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
    title: card.title,
    description: card.description,
    startTime: card.startTime,
    endTime: card.endTime,
    lon: card.longitude,
    lat: card.latitude,
    owner: ProfileUtils.fromPlain(card.owner),
    participants: List(card.participants),
    photos: List(card.photos)
  }
}

export function shortFromPlain (
  card: GroupCardShortPlain
): GroupCardShort {
  return {
    title: card.title,
    description: card.description,
    startTime: card.startTime,
    endTime: card.endTime,
    lon: card.lon,
    lat: card.lat,
    participants: List(card.participants)
  }
}
