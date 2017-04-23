/* eslint-env jest */

import loginReducer from './loginReducer'

describe('loginReducer', () => {
  it('should return default state', () => {
    expect(loginReducer(undefined, {})).toEqual(
      {
        username: '',
        password: ''
      }
    )
  })
})
