/**
 * Created by HSO on 8/20/15.
 */
"use strict";
var React = require('react');
var AuthorActions = require('../../actions/authorActions');
var AuthorStore = require('../../stores/authorStore');
var AuthorList = require('./authorlist');
var Link = require('react-router').Link;

var AuthorsPage = React.createClass({
    getInitialState: function () {
      return {
          authors: AuthorStore.getAllAuthors()
      };
    },
    render: function () {

        return (
            <div>
                <h1>Authors</h1>
                <Link to="addAuthor" className="btn btn-default"> Add Author </Link>
                <AuthorList authors={this.state.authors} />

            </div>
        );
    }
});

module.exports = AuthorsPage;