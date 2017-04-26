/* @flow */
/* eslint-disable */
'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'

import { Provider } from 'react-redux'
import { Router, Route, Redirect, hashHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import store from './store'
import LoginPage from './intro'
import Signup from './signup'

import { bindActors } from './actors'

injectTapEventPlugin()
store.subscribe(bindActors(
  store,
  ))
const history = syncHistoryWithStore(hashHistory, store)

const Root = (
    <Provider store={store}>
      <MuiThemeProvider>
        <Router history={history}>
          <Redirect from='/' to='/login' />
          <Route path='/login' component={LoginPage} />
          <Route path='/signup' component={Signup} />
        </Router>
      </MuiThemeProvider>
    </Provider>
  )

ReactDOM.render(Root, document.getElementById('root'))
