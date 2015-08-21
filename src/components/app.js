/**
 * Created by buggy on 8/20/15.
 */
/* eslint-disable strict */ //disabling strict mode here cause we need global vars.
var React = require('react');
var Header = require('./common/header');
var RouteHandler = require('react-router').RouteHandler;
$ = jQuery = require('jquery');

var App = React.createClass({
        render: function () {
            return (
                <div>
                    <Header />
                    <RouteHandler />
                </div>
            );
        }
    });

module.exports = App;

