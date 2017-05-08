/* @flow */
'use strict'

import type { Profile } from '../core/types'

export type { Profile }

export type ProfileEditState = {
  firstName: string,
  lastName: string,
  gender: string,
  birth: string,
  email: string,
  phone: string,
  address: string,
  city: string,
  country: string
}

export type ProfileState = {
  profile: Profile,
  profileEdit: ProfileEditState
}
