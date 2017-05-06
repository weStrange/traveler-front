/* @flow */
/* global File */
'use strict'

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

export type CityState = Array<string>
