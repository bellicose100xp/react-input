/**
 * Created by buggy on 9/27/15.
 */
'use strict';
import React from 'react';
import {Link} from 'react-router';
import Auth from './components/auth/auth';
import Firebase from 'firebase';
var ref = new Firebase('https://buggy-react.firebaseio.com/');

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            loggedIn: Auth.loggedIn
        };
    }

    updateAuth = authData => {
        //if (authData) {
        //    console.log("onAuth: User " + authData.uid + " is logged in with " + authData.provider);
        //} else {
        //    console.log("onAuth: User is logged out");
        //}

        this.setState({loggedIn: !!authData});
    }

    componentDidMount = () => {
        ref.onAuth(this.updateAuth); // fire this callback every time auth status changes
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row pull-right">
                        { this.state.loggedIn ?
                            (<Link to='/login' onClick={Auth.logout}> Logout </Link>)
                            : (<Link to='/login'> Login </Link>)
                        }
                    </div>
                    <div className="row">
                        <h1 id="main-title">Very Simple Customer List</h1>
                    </div>

                    <hr />
                </div>
                {this.props.children}
            </div>
        );
    }
}