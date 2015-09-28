/**
 * Created by buggy on 8/19/15.
 */
'use strict';
import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';
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
                <Route path="test" component={Test}/>
            </Route>
        </Router>
    ),
    document.querySelector('#app'));


