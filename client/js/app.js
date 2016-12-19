/**
 * Created by chan on 11/20/16.
 */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import logger from 'redux-logger';
import fsaThunk from './middleware/reduxFSAThunk';
import thunk from 'redux-thunk';

import rootReducer from './reducers';
import { getTodos } from './actions';
import { routes } from './services/routing';

import styles from '../style/main.scss';

const middleware = process.env.NODE_ENV === 'production' ? [ fsaThunk, thunk ] : [ fsaThunk, thunk, logger() ];
const store = createStore(
    rootReducer,
    applyMiddleware(...middleware)
);

const history = syncHistoryWithStore(browserHistory, store);

render((
    <Provider store={store}>
        <Router history={history} routes={routes} />
    </Provider>
), document.getElementById('app'));
