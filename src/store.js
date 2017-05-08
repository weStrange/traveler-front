/* @flow */
'use strict'
import thunkMiddleware from 'redux-thunk'

import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { hashHistory } from 'react-router'
import { routerReducer, routerMiddleware } from 'react-router-redux'

import * as reducers from './reducer'
import { lastAction } from './actors'

let middleware = [thunkMiddleware]
middleware.push(routerMiddleware(hashHistory))

const hasDevTools = process.env.NODE_ENV !== 'production' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

const store = createStore(
    combineReducers({
      ...reducers,
      lastAction: lastAction,
      routing: routerReducer
    }),
    hasDevTools
      ? compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
      )
      : applyMiddleware(...middleware)
)
// console.log(store.dispatch)

export default store
