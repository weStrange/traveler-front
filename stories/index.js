import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'
import Signup from '../src/signup/components/Signup'
import PersonalCard from '../src/card-queue/components/PersonalCard'
import img from '../img/test.jpg'

storiesOf('PersonalCard', module)
  .addDecorator(muiTheme())
  .add('default', () => (
    <PersonalCard
      username='Test Actor'
      cardTitle='A trip to Test Land'
      tripInfo={{
        where: 'Trip Land',
        when: 'Now',
        vehicle: 'Car, 4 spots',
        who: 'Luke, yoda, and 3 others'
      }}
      imageUrl={img}
      cardText='Hey guys, it would be nice if you guys can join me for TEST LAND!!!!'
    />
  ))

// @Failed : This failed because of redux integration
storiesOf('Signup', module)
  .addDecorator(muiTheme())
  .add('default', () => (
    <Signup />
  ))
