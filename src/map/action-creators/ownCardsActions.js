/* @flow */
'use strict'

import { List } from 'immutable'

import * as client from '../../core/client'

import type { Action } from '../../actions'
import type {
  PersonalCard,
  GroupCard
} from '../../core/types'
import type { AppState } from '../../types'

export function fetchPersonal (): any {
  return (dispatch: any, getState: () => AppState) => {
    dispatch(fetchPersonalRequest())

    return client.getOwnPersonalCards()
      .then((p) => dispatch(fetchPersonalSuccess(p)))
      .catch((error) => {
        console.error(error)

        dispatch(fetchPersonalFailure())
      })
  }
}

function fetchPersonalRequest (): Action {
  return {
    type: 'map-own-personal-cards-fetch-request'
  }
}

function fetchPersonalSuccess (cards: List<PersonalCard>): Action {
  return {
    type: 'map-own-personal-cards-fetch-success',
    cards: cards
  }
}

function fetchPersonalFailure (): Action {
  return {
    type: 'map-own-personal-cards-fetch-failure'
  }
}

export function fetchGroup (): any {
  return (dispatch: any, getState: () => AppState) => {
    dispatch(fetchGroupRequest())

    return client.getOwnGroupCards()
      .then((p) => dispatch(fetchGroupSuccess(p)))
      .catch((error) => {
        console.error(error)

        dispatch(fetchGroupFailure())
      })
  }
}

function fetchGroupRequest (): Action {
  return {
    type: 'map-own-group-cards-fetch-request'
  }
}

function fetchGroupSuccess (cards: List<GroupCard>): Action {
  return {
    type: 'map-own-group-cards-fetch-success',
    cards: cards
  }
}

function fetchGroupFailure (): Action {
  return {
    type: 'map-own-group-cards-fetch-failure'
  }
}
