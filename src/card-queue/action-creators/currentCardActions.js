/* @flow */
'use strict'

import type { Action } from '../../actions'
import type { PersonalCard, GroupCard } from '../types'

export function selectOwn (card: PersonalCard | GroupCard): Action {
  return {
    type: 'card-queue-own-card-select',
    card: card
  }
}

export function selectTarget (card: PersonalCard | GroupCard): Action {
  return {
    type: 'card-queue-target-card-select',
    card: card
  }
}
