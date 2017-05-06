/* @flow */
'use strict'

import { List } from 'immutable'

import type { Gender } from './types'

export type SignupAction
  = { type: 'signup-username-edit', username: string }
  | { type: 'signup-password-edit', password: string }
  | { type: 'signup-password-repeat-edit', password: string }
  | { type: 'signup-email-edit', email: string }
  | { type: 'signup-first-name-edit', firstName: string }
  | { type: 'signup-last-name-edit', lastName: string }
  | { type: 'signup-gender-edit', gender: Gender }
  | { type: 'signup-birth-edit', birth: Date }
  | { type: 'signup-phone-edit', phone: string }
  | { type: 'signup-city-edit', city: string }
  | { type: 'signup-country-edit', country: string }

  | { type: 'signup-submit-request' }
  | { type: 'signup-submit-success' }
  | { type: 'signup-submit-failure' }

  | { type: 'signup-countries-load-request' }
  | { type: 'signup-countries-load-success', countries: List<string> }
  | { type: 'signup-countries-load-failure' }

  | { type: 'signup-cities-load-request' }
  | { type: 'signup-cities-load-success', cities: List<string> }
  | { type: 'signup-cities-load-failure' }

  | { type: 'signup-stop' }
