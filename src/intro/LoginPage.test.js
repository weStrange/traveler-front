/* eslint-env jest */

import React from 'react'
import { LoginPage } from './LoginPage'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

describe('LoginPage Component', () => {
  it('renders a snapshot', () => {
    const wrapper = shallow(
      <LoginPage actions={{submit: () => {}}} />
    )

    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
