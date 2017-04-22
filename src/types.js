/* @flow */
'use strict'

import type { Action } from './actions'
import type { ProfileState } from './profile/types'
import type { LoginState } from './intro/types'

export type AppState = {
  profile: ProfileState,
  login: LoginState,
  lastAction: Action
}

export type Dispatch = (action: Action) => void
