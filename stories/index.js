/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'
import StorybookConsole from 'react-storybook-console'
import Signup from '../src/signup/components/Signup'
import PersonalCard from '../src/card-queue/components/PersonalCard'
import { FavoriteButton, DisfavoriteButton, CardButtons } from '../src/card-queue/components/CardButtons'
import CardQueue from '../src/card-queue/components/CardQueue'
import img from '../img/test.jpg'
import { generateRandomCardData } from '../src/utils/randomCardPropGenerator'
import EmptyCard from '../src/card-queue/components/EmptyCard'
import AppBar from '../src/NavigationSideBar/components/AppBar'
import Navigation from '../src/NavigationSideBar/components/Navigation'
import Sidebar from '../src/NavigationSideBar/components/Sidebar'
import AndroidIcon from 'material-ui/svg-icons/action/android'

storiesOf('Navigation', module)
  .addDecorator(muiTheme())
  .addDecorator(StorybookConsole)
  .add('Appbar', () => (<AppBar title='App bar' menuIconCallback={(e) => alert('menuIconCallback called')} />))
  .add('Sidebar', () => {
    const items = [
      {
        label: 'MenuItem1',
        leftIcon: <AndroidIcon />,
        onTouchTap: () => alert('onTouchTap')
      },
      {
        label: 'MenuItem2',
        leftIcon: <AndroidIcon />,
        onTouchTap: () => alert('onTouchTap'),
        subheader: true,
        subheaderLabel: 'a label',
        subItems: [{
          label: 'Sub menuitem 1'
        }, {
          label: 'Sub menuitem 2'
        }]
      },
      {
        label: 'MenuItem2',
        leftIcon: <AndroidIcon />,
        onTouchTap: () => alert('onTouchTap'),
        subheader: false,
        subheaderLabel: 'a label',
        subItems: [{
          label: 'Sub menuitem 1'
        }, {
          label: 'Sub menuitem 2'
        }]
      },
      {
        label: 'Hi'
      },
      {
        label: 'Hi Again'
      },
      {
        label: 'Something superlong..............................................',
        subheader: true,
        subheaderLabel: 'Something'
      }
    ]
    return <Sidebar items={items} open />
  })
  .add('Navigation side bar', () => (<Navigation />))

storiesOf('PersonalCard', module) // broken due to integration with redux
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

storiesOf('Card view action buttons', module) // broken due to integration with redux
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
storiesOf('CardQueue', module) // broken due to integration with redux
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
