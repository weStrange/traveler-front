import React from 'react'
import { storiesOf } from '@kadira/storybook'
import storybook, { muiTheme } from 'storybook-addon-material-ui'

import Signup from '../signup/components'

console.log(storybook)

const decoratorStyle = {
  margin: '20px'
}

storiesOf('Signup', module)
.addDecorator(muiTheme())
.add('default', () => (<div style={decoratorStyle}><Signup /></div>))
