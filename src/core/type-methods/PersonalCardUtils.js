/* @flow */
'use strict'

import { List } from 'immutable'

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
    title: card.title,
    description: card.description,
    startTime: card.startTime,
    endTime: card.endTime,
    longitude: card.lon,
    latitude: card.lat,
    owner: ProfileUtils.toPlain(card.owner),
    photos: card.photos.toArray()
  }
}

export function fromPlain (
  card: PersonalCardPlain
): PersonalCard {
  return {
    id: card.id,
    title: card.title,
    description: card.description,
    startTime: card.startTime,
    endTime: card.endTime,
    lon: card.longitude,
    lat: card.latitude,
    owner: ProfileUtils.fromPlain(card.owner),
    photos: List(card.photos)
  }
}
