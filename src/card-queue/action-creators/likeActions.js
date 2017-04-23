/* @flow */
'use strict'

import * as client from '../../core/client'

import type { Action } from '../../actions'

export function evaluate (
  like: boolean
): any {
  return (dispatch: any, getState: any) => {
    dispatch(evaluateRequest(like))

    let ownCard = getState().cardQueue
      .currentCard
      .ownCard
    let targetCard = getState().cardQueue
      .currentCard
      .targetCard

    return client.evaluateCard(
      ownCard.id,
      targetCard.id,
      like
    )
      .then(() => dispatch(evaluateSuccess()))
      .error((error) => {
        console.error(error)
        dispatch(evaluateFailure())
      })
  }
}

export function evaluateRequest (like: boolean):Action {
  return {
    type: 'card-queue-evaluate-request',
    like: like
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
