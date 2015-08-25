/**
 * Created by buggy on 8/23/15.
 */
"use strict";

var React = require('react');
var AuthorForm = require('./authorForm');
var AuthorApi = require('../../api/authorApi');
var Router = require('react-router');
var toastr = require('toastr');

var ManageAuthorPage = React.createClass({
    mixins: [
        Router.Navigation //transition to mixin
    ],
    statics: {
        willTransitionFrom: function(transition, component) {
            if(component.state.dirty && !confirm('You have unsaved changes, are you sure you wanna leave?')) {
                transition.abort();
            }
        }
    },
    getInitialState: function () {
        return {
            author: {
                id: '',
                firstName: '',
                lastName: ''
            },
            error: {},
            dirty: false
        };
    },
    componentWillMount: function () {
        var authorId = this.props.params.id;
        if (authorId) {
            this.setState({author: AuthorApi.getAuthorById(authorId)});
        }
    },
    setAuthorState: function (event) {
        this.setState({dirty: true});
        var field = event.target.name;
        var value = event.target.value;
        this.state.author[field] = value;
        return this.setState({author: this.state.author});
    },
    authorFormIsValid: function () {
        var formIsValid = true;
        this.state.error = {};

        if (this.state.author.firstName.length < 3) {
            this.state.error.firstName = 'The first name must be more than 3 characters';
            formIsValid = false;
        }

        if (this.state.author.lastName.length < 3) {
            this.state.error.lastName = 'The last name must be more than 3 characters';
            formIsValid = false;
        }

        this.setState({error: this.state.error});

        return formIsValid;
    },
    saveAuthor: function (event) {

        if (!this.authorFormIsValid()) {
            return;
        }

        event.preventDefault();
        AuthorApi.saveAuthor(this.state.author);
        this.setState({dirty: false});
        toastr.success('Author Added');
        this.transitionTo('authors');
    },
    render: function () {
        return (
            <div>
                <AuthorForm
                    author={this.state.author}
                    onChange={this.setAuthorState}
                    onSave={this.saveAuthor}
                    error={this.state.error}
                />
            </div>
        );
    }
});

module.exports = ManageAuthorPage;