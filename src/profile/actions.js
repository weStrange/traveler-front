/* @flow */
'use strict'

import type { Profile } from './types'

export type ProfileAction
  = { type: 'profile-load-request' }
  | { type: 'profile-load-success', profile: Profile }
  | { type: 'profile-load-failure' }

  | { type: 'profile-update-request' }
  | { type: 'profile-update-success', profile: Profile }
  | { type: 'profile-update-failure' }

  | { type: 'profile-first-name-edit', firstName: string }
  | { type: 'profile-last-name-edit', lastName: string }
  | { type: 'profile-email-edit', email: string }
  | { type: 'profile-gender-edit', gender: string }
  | { type: 'profile-age-edit', age: number }
