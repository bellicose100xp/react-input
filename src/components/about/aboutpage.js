/**
 * Created by buggy on 8/20/15.
 */
"use strict";

var React = require('react');

var About = React.createClass({
    statics: {
        willTransitionTo: function(transition, param, query, callback) {
            if(!confirm('are you sure you want to read this?')) {
                transition.abort();
            } else {
                callback();
            }
        },
        willTransitionFrom: function (transition, component) {
            if(!confirm('do you want to leave?')) {
                transition.abort();
            }
        }
    },
    render: function () {
        return (
            <div>
                <h1>About</h1>
                <p>
                    This application uses the following technologies:
                    <ul>
                        <li>React</li>
                        <li>React Router</li>
                        <li>Flux</li>
                        <li>Node</li>
                        <li>Gulp</li>
                        <li>Browserify</li>
                        <li>Bootstrap</li>
                    </ul>
                </p>
            </div>
        );
    }
});

module.exports = About;