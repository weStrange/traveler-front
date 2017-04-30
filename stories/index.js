/* eslint-disable no-unused-vars */
import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'
import Signup from '../src/signup/components/Signup'
import PersonalCard from '../src/card-queue/components/PersonalCard'
import { FavoriteButton, DisfavoriteButton, CardButtons } from '../src/card-queue/components/CardButtons'
import CardQueue from '../src/card-queue/components/CardQueue'
import img from '../img/test.jpg'
import { generateRandomCardData } from '../src/utils/randomCardPropGenerator'
import EmptyCard from '../src/card-queue/components/EmptyCard'

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
  .add('No card', () => (
    <EmptyCard />
  ))

storiesOf('Card view action buttons', module)
  .addDecorator(muiTheme())
  .add('favorite button', () => (
    <FavoriteButton />
  ))
  .add('disfavorite button', () => (
    <DisfavoriteButton />
  ))
  .add('button bar', () => (
    <div style={{width: '500px', margin: 'auto'}}><CardButtons /></div>
  ))
const makeQueue = () => {
  let queue = []
  for (var i = 0; i < 10; i++) {
    queue.push(generateRandomCardData())
  }
  return queue
}
storiesOf('CardQueue', module)
  .addDecorator(muiTheme())
  .add('personal card view', () => (
    <div style={{backgroundColor: 'red'}}>
      <CardQueue mode='PERSONAL_CARD' queue={makeQueue()} />
    </div>
  ))

// @Failed : This failed because of redux integration
storiesOf('Signup', module)
  .addDecorator(muiTheme())
  .add('default', () => (
    <Signup />
  ))
