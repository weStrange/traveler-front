/* @flow */
'use strict'

import * as client from '../../core/client'

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
      .then(() => dispatch(evaluateSuccess()))
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

export function evaluateSuccess (): Action {
  return {
    type: 'card-queue-evaluate-success'
  }
}

export function evaluateFailure (): Action {
  return {
    type: 'card-queue-evaluate-failure'
  }
}
