/**
 * Created by HSO on 8/20/15.
 */
"use strict";
var React = require('react');
var AuthorApi = require('../../api/authorApi');
var AuthorList = require('./authorlist');

var AuthorsPage = React.createClass({
    getInitialState: function () {
      return {
          authors: []
      };
    },
    componentDidMount: function () {
        if (this.isMounted()) {
            this.setState({authors: AuthorApi.getAllAuthors()});
        }
    },
    render: function () {

        return (
            <div>
                <h1>Authors</h1>
                <AuthorList authors={this.state.authors} />

            </div>
        );
    }
});

module.exports = AuthorsPage;