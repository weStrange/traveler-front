/* @flow */
/* global File */
'use strict'

import { List } from 'immutable'

import type {
  GooglePlace,
  GooglePlaceDetails,
  GoogleLocation,
  GroupCard,
  PersonalCard
} from '../core/types'
import type { CardType } from './types'

export type MapAction
  = { type: 'map-search-request', search: string }
  | { type: 'map-search-success', places: List<GooglePlace> }
  | { type: 'map-search-failure' }

  | { type: 'map-place-get-all', places: List<GooglePlace> }

  | { type: 'map-place-select-request', placeId: string }
  | { type: 'map-place-select-success', place: GooglePlaceDetails }
  | { type: 'map-place-select-failure' }

  | { type: 'map-map-set-zoom', zoom: number }
  | { type: 'map-map-nav', location: GoogleLocation }

  | { type: 'map-card-add-request' }
  | { type: 'map-card-add-success' }
  | { type: 'map-card-add-failure' }

  | { type: 'map-card-create-start' }
  | { type: 'map-card-create-end' }
  | { type: 'map-card-create-title-edit', title: string }
  | { type: 'map-card-create-description-edit', description: string }
  | { type: 'map-card-create-location-name-edit', name: string }
  | { type: 'map-card-create-type-edit', cardType: CardType }
  | { type: 'map-card-create-start-time-edit', startTime: Date }
  | { type: 'map-card-create-end-time-edit', endTime: Date }
  | { type: 'map-card-create-file-edit', file: File }
  | { type: 'map-card-create-image-url-edit', url: string }

  | { type: 'map-card-create-location-options-fetch-request', input: string }
  | { type: 'map-card-create-location-options-fetch-success', options: List<GooglePlace> }
  | { type: 'map-card-create-location-options-fetch-failure' }

  | { type: 'map-card-create-location-request', placeId: string }
  | { type: 'map-card-create-location-success', location: GoogleLocation }
  | { type: 'map-card-create-location-failure' }

  | { type: 'map-own-personal-cards-fetch-request' }
  | { type: 'map-own-personal-cards-fetch-success', cards: List<PersonalCard> }
  | { type: 'map-own-personal-cards-fetch-failure' }

  | { type: 'map-own-group-cards-fetch-request' }
  | { type: 'map-own-group-cards-fetch-success', cards: List<GroupCard> }
  | { type: 'map-own-group-cards-fetch-failure' }

  | { type: 'map-card-modal-show', card: PersonalCard | GroupCard }
  | { type: 'map-card-modal-hide' }
  | { type: 'map-card-modal-location-name-request', location: GoogleLocation }
  | { type: 'map-card-modal-location-name-success', name: string }
  | { type: 'map-card-modal-location-name-failure' }
