/**
 * Created by buggy on 9/19/15.
 */
'use strict';
import React from 'react';
import Input from './input';

export default class Homepage extends React.Component {

    updateForm(e) {
        console.log(this);
        e.preventDefault();
        let x = React.findDOMNode(this.refs.firstName).value;
        let y = React.findDOMNode(this.refs.lastName).value;
        console.log(`${x} ${y}`);
    }

    render(){
        return (
          <div className="container">
              <Input updateForm={this.updateForm} />
          </div>
        );
    }
}
