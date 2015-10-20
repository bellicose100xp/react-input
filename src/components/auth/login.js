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

                <div className="form-group">
                    <label htmlFor="email">Email: </label>
                    <input className="form-control" name="email" type="email" ref="email" placeholder="email" required/>
                </div>

                <div className="form-group">
                    <label htmlFor="pass">Password: </label>
                    <input className="form-control" name="pass" type="password" ref="pass" placeholder="password" required/>
                </div>

                <button className="btn btn-primary" type="submit">login</button>
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