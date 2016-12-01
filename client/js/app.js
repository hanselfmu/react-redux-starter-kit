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
import fsaThunk from './middleware/redux-fsa-thunk';
import thunk from 'redux-thunk';

import rootReducer from './reducers';
import { getTodos } from './actions';
import TodoApp from './pages/TodoApp';
import About from './pages/About';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

const middleware = process.env.NODE_ENV === 'production' ? [ fsaThunk, thunk ] : [ fsaThunk, thunk, logger() ];
const store = createStore(
    rootReducer,
    applyMiddleware(...middleware)
);

const history = syncHistoryWithStore(browserHistory, store)

render((
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={TodoApp} />
            <Route path="about" component={About} />
            <Route path="settings" component={Settings} />
            <Route path="*" component={NotFound} />
        </Router>
    </Provider>
), document.getElementById('app'));