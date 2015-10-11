/**
 * Created by buggy on 9/27/15.
 */
'use strict';
import React from 'react';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <div className="container">
                    <h1 id="main-title">Very Simple Customer List</h1>
                </div>
                {this.props.children}
            </div>
        );
    }
}