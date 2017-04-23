/* @flow */
'use strict'

import type { SignUpState } from '../types'
import type { SignUpRequest } from '../../core/types'

export function toProfile (
  input: SignUpState
): SignUpRequest {
  return {
    username: input.username,
    password: input.password,
    firstName: input.firstName,
    lastName: input.lastName,
    gender: input.gender,
    birth: input.birth || '',
    email: input.email || '',
    phone: input.phone || '',
    address: input.address || '',
    city: input.city || '',
    country: input.country || ''
  }
}
