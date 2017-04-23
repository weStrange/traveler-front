/* @flow */
'use strict'

import type { Action } from './actions'
import type { ProfileState } from './profile/types'
import type { LoginState } from './intro/types'
import type { SignUpState } from './signup/types'
import type { CardQueueState } from './card-queue/types'

export type AppState = {
  profile: ProfileState,
  login: LoginState,
  signup: SignUpState,
  cardQueue: CardQueueState,
  lastAction: Action
}

export type Dispatch = (action: Action) => void
