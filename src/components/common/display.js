/**
 * Created by admin on 10/12/2015.
 */
'use strict';
import React from 'react';

export default class Display extends React.Component {
    render() {
        return this.props.if ? <span>{this.props.children}</span> : null;
    }
}