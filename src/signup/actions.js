/* @flow */
'use strict'

import type { Gender } from './types'

export type SignupAction
  = { type: 'signup-username-edit', username: string }
  | { type: 'signup-password-edit', password: string }
  | { type: 'signup-password-repeat-edit', password: string }
  | { type: 'signup-email-edit', email: string }
  | { type: 'signup-first-name-edit', firstName: string }
  | { type: 'signup-last-name-edit', lastName: string }
  | { type: 'signup-gender-edit', gender: Gender }
  | { type: 'signup-phone-edit', phone: string }
  | { type: 'signup-city-edit', city: string }
  | { type: 'signup-country-edit', country: string }

  | { type: 'signup-submit-request' }
  | { type: 'signup-submit-success' }
  | { type: 'signup-submit-failure' }
