/* @flow */
'use strict'

import { List } from 'immutable'

import type { PersonalCard, GroupCard } from './types'

export type CardQueueAction
  = { type: 'card-queue-personal-load-request' }
  | { type: 'card-queue-personal-load-success', cards: List<PersonalCard> }
  | { type: 'card-queue-personal-load-failure' }

  | { type: 'card-queue-group-load-request' }
  | { type: 'card-queue-group-load-success', cards: List<GroupCard> }
  | { type: 'card-queue-group-load-failure' }

  | { type: 'card-queue-evaluate-request', like: boolean }
  | { type: 'card-queue-evaluate-success' }
  | { type: 'card-queue-evaluate-failure' }

  | { type: 'card-queue-own-card-select', card: PersonalCard | GroupCard }
  | { type: 'card-queue-target-card-select', card: PersonalCard | GroupCard }

  | { type: 'card-queue-stop' }
