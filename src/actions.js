/* @flow */
'use strict'

import type { ProfileAction } from './profile/actions'
import type { LoginAction } from './intro/actions'
import type { SignupAction } from './signup/actions'
import type { CardQueueAction } from './card-queue/actions'
import type { MapAction } from './map/actions'

export type Action
  = ProfileAction
  | LoginAction
  | SignupAction
  | CardQueueAction
  | MapAction
