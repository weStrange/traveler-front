/* @flow */
/* eslint-disable */
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Router, Route, Redirect, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { bindActors } from './actors';
import store from './store';
import LoginPage from './intro/index';

injectTapEventPlugin();
store.subscribe(bindActors(
  store,
  ));
const history = syncHistoryWithStore(hashHistory, store);

const Root = (
    <Provider store={store}>
      <MuiThemeProvider>
        <Router history={history}>
          <Redirect from="/" to="/home" />
          <Route path="/home" component={LoginPage} />
        </Router>
      </MuiThemeProvider>
    </Provider>
  );

ReactDOM.render(Root, document.getElementById('root'));
