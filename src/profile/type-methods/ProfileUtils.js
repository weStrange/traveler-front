/* @flow */
'use strict'

import type { Profile, ProfileUpdateRequest } from '../../core/types'

export function toUpdateRequest (
  input: Profile
): ProfileUpdateRequest {
  return {
    firstName: input.firstName,
    lastName: input.lastName,
    gender: input.gender,
    birth: input.birth,
    email: input.email,
    phone: input.phone,
    address: input.address,
    city: input.city,
    country: input.country
  }
}
