/* @flow */
'use strict'

import { List } from 'immutable'

import * as client from '../../core/client'

import type { Action } from '../../actions'
import type { GroupCard } from '../types'

export function load (
  lat: number,
  lon: number,
  includeArchived?: boolean = false
): any {
  return (dispatch: any, getState: any) => {
    dispatch(loadRequest())

    let offset = getState().cardQueue
      .groupCards
      .nextOffset

    return client.getGroupCards(
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
    type: 'card-queue-group-load-request'
  }
}

export function loadSuccess (cards: List<GroupCard>): Action {
  return {
    type: 'card-queue-group-load-success',
    cards: cards
  }
}

export function loadFailure (): Action {
  return {
    type: 'card-queue-group-load-failure'
  }
}
