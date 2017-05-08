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
    let currOwnCard = getState().cardQueue
      .currentCard
      .ownCard
    let groupCards = List()

    return client.getGroupCards(
      lat,
      lon,
      offset,
      includeArchived
    )
      .then((cards) => {
        groupCards = cards

        return cards
      })
      .then(() => client.getEvaluations(currOwnCard.id))
      .then((evals) => groupCards.filterNot((p) => evals.map((t) => t.cardId)
        .includes(p.id)))
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

    return client.getOwnGroupCards()
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
    type: 'card-queue-group-load-request'
  }
}

function loadSuccess (cards: List<GroupCard>): Action {
  return {
    type: 'card-queue-group-load-success',
    cards: cards
  }
}

function loadFailure (): Action {
  return {
    type: 'card-queue-group-load-failure'
  }
}

function loadOwnRequest ():Action {
  return {
    type: 'card-queue-own-group-load-request'
  }
}

function loadOwnSuccess (cards: List<GroupCard>): Action {
  return {
    type: 'card-queue-own-group-load-success',
    cards: cards
  }
}

function loadOwnFailure (): Action {
  return {
    type: 'card-queue-own-group-load-failure'
  }
}
