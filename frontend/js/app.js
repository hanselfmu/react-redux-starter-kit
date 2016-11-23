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

const store = createStore(rootReducer);

function App() {
    return (
        <div>TodoMVC App Page</div>
    )
}

function About() {
    return (
        <div>TodoMVC About Page</div>
    )
}

function Settings() {
    return (
        <div>TodoMVC Settings Page</div>
    )
}

function NoMatch() {
    return (
        <div>The route is not found on this app</div>
    )
}

render((
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App} />
            <Route path="about" component={About} />
            <Route path="settings" component={Settings} />
            <Route path="*" component={NoMatch} />
        </Router>
    </Provider>
), document.getElementById('app'));