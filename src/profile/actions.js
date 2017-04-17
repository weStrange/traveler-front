/* @flow */
'use strict'

import type { Profile } from './types'

export type ProfileAction
  = { type: 'profile-load-request' }
  | { type: 'profile-load', profile: Profile }

  | { type: 'profile-first-name-edit', firstName: string }
  | { type: 'profile-last-name-edit', lastName: string }
  | { type: 'profile-email-edit', email: string }
  | { type: 'profile-gender-edit', gender: string }
  | { type: 'profile-age-edit', age: number }
