/**
 * Created by buggy on 8/21/15.
 */
"use strict";
var React = require('react');
var Link = require('react-router').Link;

var NotFoundPage = React.createClass({
    render: function() {
        return (
            <div>
                <h1>Page Not Found</h1>
                <p>There is noting to see here, move along1</p>
                <p><Link to="app"> Back to Home </Link></p>
            </div>
        );
    }
});

module.exports = NotFoundPage;