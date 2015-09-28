/**
 * Created by buggy on 8/19/15.
 */
'use strict';
import React from 'react';
import {Router, Route} from 'react-router';


import App from './app';
import Homepage from './components/homepage';
import Customers from './components/customers';
import Test from './components/test';


React.render((
        <Router>
            <Route component={App}>
                <Route path="/" component={Homepage}/>
                <Route path="test" component={Test}/>
            </Route>
        </Router>
    ),
    document.querySelector('#app'));


