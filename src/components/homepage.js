/**
 * Created by buggy on 9/19/15.
 */
'use strict';
import React from 'react';
import Input from './input';
import Customers from './customers';

export default class Homepage extends React.Component {

    constructor() {
        super();

        this.state = {
            customer: {
                firstName: '',
                lastName: ''
            },
            allCustomers: [],
            dirty: false
        };
    }

    static contextTypes= {
        history: React.PropTypes.object,
        location: React.PropTypes.object
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
        this.context.history.pushState(null, '/test');

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
