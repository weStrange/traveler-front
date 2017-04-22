/* @flow */
'use strict'

export type Profile = {
  username: string,
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

export type SignUpRequest = {
  username: string,
  password: string,
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
