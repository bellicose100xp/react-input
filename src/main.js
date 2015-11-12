/**
 * Created by buggy on 8/19/15.
 */
/* eslint-disable strict */ //disabling strict mode here cause we need global vars.
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute} from 'react-router';
import Auth from './components/auth/auth';

import Customer from './components/updateCustomer/customer';

// this gets rid of wierd characters in URL
import createBrowserHistory from 'history/lib/createBrowserHistory';
let history = createBrowserHistory();

import App from './app';
import Homepage from './components/homepage/homepage';
import Customers from './components/homepage/customers';
import Test from './components/test';
import Login from './components/auth/login';
import RxJS from './components/rxjs/rxjs';
import Reports from './components/reports/reports';
import DumbComponent from './components/hoc/dumbComponent';

let requireAuth = (nextState, replaceState) => {
    if (!Auth.loggedIn()) {
        replaceState({nextPathname: nextState.location.pathname}, '/login');
    }
};

ReactDOM.render((
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={Homepage} onEnter={requireAuth} />
                <Route path="/customer/:customerId" component={Customer} />
                <Route path="test" component={Test}/>
                <Route path="login" component={Login}/>
                <Route path="rxjs" component={RxJS} />
                <Route path="reports" component={Reports} />
                <Route path="hoc" component={DumbComponent} />
            </Route>
        </Router>
    ),
    document.querySelector('#app'));

