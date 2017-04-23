/* @flow */
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
  birth?: string,
  phone?: string,
  address?: string,
  city?: string,
  country?: string
}
