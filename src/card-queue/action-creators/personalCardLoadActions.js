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
      .catch((error) => {
        console.error(error)
        dispatch(loadFailure())
      })
  }
}

export function loadOwn (): any {
  return (dispatch: any, getState: any) => {
    dispatch(loadOwnRequest())

    return client.getOwnPersonalCards()
      .then((cards) => {
        dispatch(loadOwnSuccess(cards))

        return cards
      })
      .catch((error) => {
        console.error(error)
        dispatch(loadOwnFailure())
      })
  }
}

function loadRequest ():Action {
  return {
    type: 'card-queue-personal-load-request'
  }
}

function loadSuccess (cards: List<PersonalCard>): Action {
  return {
    type: 'card-queue-personal-load-success',
    cards: cards
  }
}

function loadFailure (): Action {
  return {
    type: 'card-queue-personal-load-failure'
  }
}

function loadOwnRequest ():Action {
  return {
    type: 'card-queue-own-personal-load-request'
  }
}

function loadOwnSuccess (cards: List<PersonalCard>): Action {
  return {
    type: 'card-queue-own-personal-load-success',
    cards: cards
  }
}

function loadOwnFailure (): Action {
  return {
    type: 'card-queue-own-personal-load-failure'
  }
}
