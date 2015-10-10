/**
 * Created by buggy on 9/19/15.
 */
'use strict';
import React from 'react';
import Input from './input';
import Customers from './customers';
import customerStore from '../flux/customerStore';
import Actions from '../flux/actions';
import _ from 'lodash';

export default class Homepage extends React.Component {

    constructor() {
        super();

        this.state = {
            customer: {
                firstName: '',
                lastName: ''
            },
            allCustomers: [],
            filteredCustomers: [],
            dirty: false,
            searchEvent: {target: {value: ''}}
        };
    }

    static contextTypes = {
        history: React.PropTypes.object,
        location: React.PropTypes.object
    }

    filterCustomers = event => {

        let filter = event.target.value.toUpperCase();
// this step is so that I can get updated value on this.getAllCustomerData
        let searchEventTemp = {
            target: {
                value: filter
            }
        };

        this.setState({searchEvent: searchEventTemp});

        if (filter) {
            this.state.filteredCustomers = _.filter(this.state.allCustomers, customer => {
                return customer.firstName.toUpperCase().match(new RegExp(filter))
                    || customer.lastName.toUpperCase().match(new RegExp(filter));
            });
            this.setState({filteredCustomers: this.state.filteredCustomers});
        } else {
            this.setState({filteredCustomers: this.state.allCustomers});
        }
    }

    getAllCustomerData = () => {
        $.get('http://localhost:8000/api/customers', (data) => {
            console.log('getting all customers...');
            this.setState({allCustomers: data});
            this.filterCustomers(this.state.searchEvent);
        });
    }

    componentDidMount = () => {
        document.querySelector('#firstName').focus();
        //this.getAllCustomerData();
        customerStore.addChangeListener(this.getAllCustomerData);
        customerStore.emitChange(); //getting initial data on load from database
    }

    componentWillUnmount = () => {
        customerStore.removeChangeListener(this.getAllCustomerData);
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

        Actions.addCustomer({firstName: firstName, lastName: lastName});

        this.state.customer.firstName = '';
        this.state.customer.lastName = '';

        document.querySelector('#firstName').focus();

        // this.context.history.pushState(null, '/test');

    }

    removeCustomer = (customer) => {
        // console.log(customer);
        Actions.removeCustomer(customer);
    };

    render() {
        return (
            <div className="container">

                <Input
                    updateCustomer={this.updateCustomer}
                    customer={this.state.customer}
                    dirty={this.state.dirty}
                    updateForm={this.updateForm}
                />

                <Customers
                    customers={this.state.filteredCustomers}
                    removeCustomer={this.removeCustomer}
                    filterCustomers={this.filterCustomers}
                />

            </div>
        );
    }
}
