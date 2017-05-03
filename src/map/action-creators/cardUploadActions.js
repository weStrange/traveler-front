/* @flow */
'use strict'

import { List } from 'immutable'

import * as client from '../../core/client'
import * as ownCard from './ownCardsActions'

import type { CardType } from '../types'
import type { PersonalCardShort, GroupCardShort } from '../../core/types'
import type { AppState } from '../../types'

export function upload (
  type: CardType,
  card: PersonalCardShort | GroupCardShort
): any {
  return (dispatch: any, getState: () => AppState) => {
    dispatch(addCardRequest())

    if (type === 'personal') {
      return client.createPersonalCard(card)
        .then((card) => {
          dispatch(addCardSuccess())

          dispatch(ownCard.fetchPersonal())
          return card
        })
        .catch((error) => {
          console.error(error)
          dispatch(addCardFailure())
        })
    } else if (type === 'group') {
      return client.createGroupCard({
        ...card,
        participants: List()
      })
        .then((card) => {
          dispatch(addCardSuccess())

          dispatch(ownCard.fetchGroup())
          return card
        })
        .catch((error) => {
          console.error(error)
          dispatch(addCardFailure())
        })
    }
  }
}

function addCardRequest () {
  return {
    type: 'map-card-add-request'
  }
}

function addCardSuccess () {
  return {
    type: 'map-card-add-success'
  }
}

function addCardFailure () {
  return {
    type: 'map-card-add-failure'
  }
}
