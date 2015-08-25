/**
 * Created by buggy on 8/23/15.
 */
"use strict";

var React = require('react');
var Input = require('../common/inputPage');

var AuthorForm = React.createClass({
    propTypes: {
        author: React.PropTypes.object.isRequired,
        onChange: React.PropTypes.func.isRequired,
        error: React.PropTypes.object,
        onSave: React.PropTypes.func.isRequired
    },
    render: function () {
        return (
            <form>
                <h1> Author Page </h1>
                <Input
                    label="First Name"
                    name="firstName"
                    placeholder="First Name"
                    value={this.props.author.firstName}
                    onChange={this.props.onChange}
                    error={this.props.error.firstName}
                />
                <br/>
                <Input
                    label="Last Name"
                    name="lastName"
                    placeholder="Last Name"
                    value={this.props.author.lastName}
                    onChange={this.props.onChange}
                    error={this.props.error.lastName}
                />
                <br/>
                <input
                    type="submit"
                    value="Save"
                    className="btn btn-default"
                    onClick={this.props.onSave}
                />
            </form>
        );
    }
});

module.exports = AuthorForm;