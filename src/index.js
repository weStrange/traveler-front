/* @flow */
'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, Redirect, hashHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import { bindActors } from './actors'
import { profileClientActor } from './profile/actors'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import ProfileView from './profile'

import store from './store'

import * as client from './core/client'

store.subscribe(bindActors(
  store,
  profileClientActor(client)
))

const history = syncHistoryWithStore(hashHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Router history={history}>
        <Redirect from='/' to='/profile' />
        <Route path='/profile' component={ProfileView} />
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('mount')
)
