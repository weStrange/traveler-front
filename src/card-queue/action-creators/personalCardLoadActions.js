/* @flow */
'use strict'

import { List } from 'immutable'

import * as client from '../../core/client'

import type { Action } from '../../actions'
import type { PersonalCard } from '../types'

export function load (
  lat: number,
  lon: number,
  includeArchived?: boolean = false
): any {
  return (dispatch: any, getState: any) => {
    dispatch(loadRequest())

    let offset = getState().cardQueue
      .personalCards
      .nextOffset

    return client.getPersonalCards(
      lat,
      lon,
      offset,
      includeArchived
    )
      .then((cards) => dispatch(loadSuccess(cards)))
      .error((error) => {
        console.error(error)
        dispatch(loadFailure())
      })
  }
}

export function loadRequest ():Action {
  return {
    type: 'card-queue-personal-load-request'
  }
}

export function loadSuccess (cards: List<PersonalCard>): Action {
  return {
    type: 'card-queue-personal-load-success',
    cards: cards
  }
}

export function loadFailure (): Action {
  return {
    type: 'card-queue-personal-load-failure'
  }
}
