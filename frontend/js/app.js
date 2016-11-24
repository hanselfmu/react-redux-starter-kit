/**
 * Created by chan on 11/20/16.
 */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';

import TodoApp from './pages/TodoApp';
import About from './pages/About';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

const store = createStore(rootReducer);

render((
    <Provider store={store}>
        <Header />
        <Router history={browserHistory}>
            <Route path="/" component={TodoApp} />
            <Route path="about" component={About} />
            <Route path="settings" component={Settings} />
            <Route path="*" component={NotFound} />
        </Router>
        <Footer />
    </Provider>
), document.getElementById('app'));