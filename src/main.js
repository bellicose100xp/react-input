/**
 * Created by buggy on 8/19/15.
 */
"use strict";

var React = require('react');
var Router = require('react-router');
var routes = require('./routes');

Router.run(routes, function (Handler) {
   React.render(<Handler />, document.querySelector('#app'));
});



