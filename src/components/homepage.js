/**
 * Created by buggy on 9/19/15.
 */
'use strict';
import React from 'react';
import Input from './input';

export default class Homepage extends React.Component {

    constructor(){

        super();

        this.state = {
            customer: {
                firstName: 'John',
                lastName: 'Doe'
            }
        };

    }

    updateCustomer(){
        this.setState({customer: this.state.customer});
    }

    updateForm(e) {
        //console.log(this);
        e.preventDefault();
        let firstName = React.findDOMNode(this.refs.firstName).value;
        let lastName = React.findDOMNode(this.refs.lastName).value;
        console.log(`${firstName} ${lastName}`);
    }

    render(){
        return (
          <div className="container">
              <Input
                  updateCustomer={this.updateCustomer}
                  customer={this.state.customer}
                  updateForm={this.updateForm} />
          </div>
        );
    }
}
