/* @flow */
'use strict'

import * as client from '../../core/client'

import * as currCardActions from './currentCardActions'

import type { Action } from '../../actions'
import type { PersonalCard, GroupCard } from '../../core/types'

export function evaluate (
  like: boolean,
  targetCard: PersonalCard | GroupCard
): any {
  return (dispatch: any, getState: any) => {
    dispatch(evaluateRequest(like, targetCard))

    let ownCard = getState().cardQueue
      .currentCard
      .ownCard

    return client.evaluateCard(
      ownCard.id,
      targetCard.id,
      like
    )
      .then((match) => {
        dispatch(evaluateSuccess(match))

        if (!match) {
          dispatch(currCardActions.nextTarget())
        }
      })
      .catch((error) => {
        console.error(error)
        dispatch(evaluateFailure())
      })
  }
}

export function evaluateRequest (like: boolean, target: PersonalCard | GroupCard):Action {
  return {
    type: 'card-queue-evaluate-request',
    like: like,
    target: target
  }
}

export function evaluateSuccess (match: boolean): Action {
  return {
    type: 'card-queue-evaluate-success',
    match: match
  }
}

export function evaluateFailure (): Action {
  return {
    type: 'card-queue-evaluate-failure'
  }
}
