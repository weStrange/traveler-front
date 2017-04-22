/* @flow */
'use strict'

import type { ProfileAction } from './profile/actions'
import type { LoginAction } from './intro/actions'

export type Action
  = ProfileAction
  | LoginAction
