/* @flow */
'use strict'

import es6Promise from 'es6-promise'
import isomorphicFetch from 'isomorphic-fetch'

import type { Profile } from './types'

es6Promise.polyfill()

export function getProfileInfo () {
  fetch('/api/profile')
  	.then((response) => {
  		if (response.status >= 400) {
  			throw new Error("Bad response from server");
  		}
  		return response.json()
  	})
  	.catch((error) => {
      console.log(error)
      return null
    })
}

export function updateProfileInfo (
  profile: Profile
) {
  fetch('/api/profile', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(profile)
  })
  	.then((response) => {
  		if (response.status >= 400) {
  			throw new Error("Bad response from server");
  		}
  		return response.json()
  	})
  	.catch((error) => {
      console.log(error)
      return null
    })
}
