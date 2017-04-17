/* @flow */
'use strict'

import type { Action } from './actions'
import type { ProfileState } from './profile/types'

export type AppState = {
  profile: ProfileState,
  lastAction: Action
}

export type Dispatch = (action: Action) => void
