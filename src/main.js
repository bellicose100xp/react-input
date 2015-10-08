/**
 * Created by buggy on 8/19/15.
 */
/* eslint-disable strict */ //disabling strict mode here cause we need global vars.
import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';

import Customer from './components/customer';

// this gets rid of wierd characters in URL
import createBrowserHistory from 'history/lib/createBrowserHistory';
let history = createBrowserHistory();

import App from './app';
import Homepage from './components/homepage';
import Customers from './components/customers';
import Test from './components/test';

React.render((
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={Homepage} />
                <Route path="/customer/:customerId" component={Customer} />
                <Route path="test" component={Test}/>
            </Route>
        </Router>
    ),
    document.querySelector('#app'));

