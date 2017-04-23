import React from 'react'
import { storiesOf, action, configure, addDecorator } from '@kadira/storybook'
import 'storybook-addon-material-ui'
import {muiTheme} from 'storybook-addon-material-ui'

import Signup from '../signup/index'

const decoratorStyle = {
	margin: '20px'
}

storiesOf('Signup', module)
.addDecorator(muiTheme())
.add('default', () => (<div style={decoratorStyle}><Signup /></div>))