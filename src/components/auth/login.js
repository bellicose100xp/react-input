/**
 * Created by admin on 10/19/2015.
 */
'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import Auth from './auth';

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            error: false
        };
    }

    handleSubmit = event => {
        event.preventDefault();

        let email = ReactDOM.findDOMNode(this.refs.email).value;
        let pass = ReactDOM.findDOMNode(this.refs.pass).value;

        Auth.login(email, pass, (loggedIn) => {
            if (!loggedIn) {
                return this.setState({error: true});
            }

            let { location } = this.props;

            if (location.state && location.state.nextPathname) {
                this.context.history.replaceState(null, location.state.nextPathname);
            } else {
                this.context.history.replaceState(null, '/');
            }
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label><input type="email" ref="email" placeholder="email" required/></label>
                <label><input type="password" ref="pass" placeholder="password" required/></label>
                <br />
                <button type="submit">login</button>
                {this.state.error && (
                    <p>Bad login information</p>
                )}
            </form>
        );
    }
}

Login.contextTypes = {
    history: React.PropTypes.object,
    location: React.PropTypes.object
};