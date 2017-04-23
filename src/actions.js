/* @flow */
'use strict'

import type { ProfileAction } from './profile/actions'
import type { LoginAction } from './intro/actions'
import type { SignupAction } from './signup/actions'

export type Action
  = ProfileAction
  | LoginAction
  | SignupAction
