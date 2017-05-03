/* @flow */
'use strict'

import { List } from 'immutable'

import type {
  GooglePlace,
  GooglePlacePlain
} from '../types'

export function placeToPlain (
  place: GooglePlace
): GooglePlacePlain {
  return {
    description: place.description,
    id: place.id,
    matched_substrings: place.matched_substrings.toArray(),
    place_id: place.place_id,
    reference: place.reference,
    terms: place.terms.toArray(),
    types: place.types.toArray()
  }
}

export function placeFromPlain (
  place: GooglePlacePlain
): GooglePlace {
  return {
    description: place.description,
    id: place.id,
    matched_substrings: List(place.matched_substrings),
    place_id: place.place_id,
    reference: place.reference,
    terms: List(place.terms),
    types: List(place.types)
  }
}
