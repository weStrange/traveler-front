/* @flow */
'use strict'

import { List } from 'immutable'

import type {
  PersonalCard,
  GroupCard
} from '../core/types'

export type {
  PersonalCard,
  GroupCard
}

export type PersonalQueueState = {
  cards: List<PersonalCard>,
  ownCards: List<PersonalCard>,
  nextOffset: number
}

export type GroupQueueState = {
  cards: List<GroupCard>,
  ownCards: List<GroupCard>,
  nextOffset: number
}

export type CurrentCardState = {
  ownCard: PersonalCard | GroupCard | null,
  targetCard: PersonalCard | GroupCard | null
}

export type CardQueueState = {
  personalCards: PersonalQueueState,
  groupCards: GroupQueueState,
  currentCard: CurrentCardState
}
