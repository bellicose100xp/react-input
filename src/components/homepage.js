/**
 * Created by buggy on 9/19/15.
 */
'use strict';
import React from 'react';
import PropTypes from 'react-router';
import Input from './input';
import Customers from './customers';
import Router from 'react-router';

export default class Homepage extends React.Component {

    constructor(props, context) {

        super(props, context);

        //console.log(props, context);
        //this.context = context;

        this.state = {
            customer: {
                firstName: '',
                lastName: ''
            },
            allCustomers: [],
            dirty: false
        };

    }

    componentDidMount = () => {
        document.querySelector('#firstName').focus();
    }

    updateCustomer = event => {
        let property = event.target.name;
        let value = event.target.value;
        this.state.customer[property] = value;
        this.setState({customer: this.state.customer});
    }

    updateForm = event => {
        event.preventDefault();

        let firstName = this.state.customer.firstName;
        let lastName = this.state.customer.lastName;
        let customerListToUpdate = this.state.allCustomers;
        customerListToUpdate.push({firstName: firstName, lastName: lastName});
        this.setState({allCustomers: customerListToUpdate});

        this.state.customer.firstName = '';
        this.state.customer.lastName = '';

        document.querySelector('#firstName').focus();
        window.location = '#/test';
       // this.context.router.transitionTo('#/test');

    }

    render() {
        return (
            <div className="container">

                <Input
                    updateCustomer={this.updateCustomer}
                    customer={this.state.customer}
                    dirty={this.state.dirty}
                    updateForm={this.updateForm}/>

                <Customers
                    customers={this.state.allCustomers}
                />

            </div>
        );
    }
}

//Homepage.contextTypes = {
//    router: React.PropTypes.func.isRequired
//};