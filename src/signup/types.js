/* @flow */
/* global File */
'use strict'

import { List } from 'immutable'

import type { GooglePlace } from '../core/types'

export type Gender = 'male' | 'female' | 'other'

export type SignUpState = {
  username: string,
  password: string,
  passwordRepeat: string,
  email: string,
  firstName: string,
  lastName: string,
  gender: Gender,
  birth: Date,
  phone: string,
  address: string,
  city: string,
  country: string,
  imageFile: File | null,
  imageUrl: string
}

export type CountryState = Array<string>

export type CityState = List<GooglePlace>
