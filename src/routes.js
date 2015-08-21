/**
 * Created by buggy on 8/20/15.
 */
"use strict";
var React = require('react');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var Redirect = Router.Redirect;

var routes = (
    <Route name="app" path="/" handler={require('./components/app')}>
        <DefaultRoute handler={require('./components/homepage')}/>
        <Route name="authors" handler={require('./components/authors/authorpage')}/>
        <Route name="about" handler={require('./components/about/aboutpage')}/>
        <NotFoundRoute handler={require('./components/notFoundPage')}/>
        <Redirect from="about-us" to="about" />
    </Route>
);

module.exports = routes;