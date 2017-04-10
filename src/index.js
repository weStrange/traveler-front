/* @flow */
'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, Redirect, hashHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import { bindActors } from './actors'

import store from './store'

store.subscribe(bindActors(
  store
))

const history = syncHistoryWithStore(hashHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Redirect from='/' to='/home' />
      <Route path='/home' component={() => (<p>Hello!</p>)} />
    </Router>
  </Provider>,
  document.getElementById('mount')
)
