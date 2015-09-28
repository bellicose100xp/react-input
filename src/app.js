/**
 * Created by buggy on 9/27/15.
 */
'use strict';
import React from 'react';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <h1>I'M IN APP.JS</h1>
                {this.props.children}
            </div>
        );
    }
}