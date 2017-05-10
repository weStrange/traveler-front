/* @flow */
/* eslint-disable */
'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin'

import { Provider } from 'react-redux'
import { Router, Route, Redirect, hashHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Link } from 'react-router'
import { StyleRoot } from 'radium'
import { orange500 } from 'material-ui/styles/colors'

import store from './store'

import LoginPage from './intro'
import Signup from './signup'
import CardQueue from './card-queue'
import WorldMap from './map'
import Navigation from './NavigationSideBar'
import Messaging from './messaging'

import { CreateCardView } from './map/components'
import { bindActors } from './actors'

injectTapEventPlugin()
store.subscribe(bindActors(
  store,
  ))
const history = syncHistoryWithStore(hashHistory, store)

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: orange500,
  }
})

const Root = (
    <StyleRoot>
      <Provider store={store}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <Router history={history}>
            <Redirect from='/' to='/login' />
            <Route path='/login' component={LoginPage} />
            <Route path='/signup' component={Signup} />
            <Route path='/' component={Navigation}>
              <Route path='card-queue' component={CardQueue} />
              <Route path='map' component={WorldMap} />
              <Route path='messaging' component={Messaging} />
            </Route>
            <Route path='*' component={() => (<div><h1>Page not found</h1><p><Link to='/'>Back</Link></p></div>)} />
          </Router>
        </MuiThemeProvider>
      </Provider>
    </StyleRoot>
  )

ReactDOM.render(Root, document.getElementById('root'))
