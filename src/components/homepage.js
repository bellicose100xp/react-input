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
            displayDirtyErrorMessage: false,
            displayInvalidErrorMessage: false,
            // if error the it will be 'true' otherwise 'false'
            errors: {
                firstName: {
                    required: false,
                    min: false
                },
                lastName: {
                    required: false,
                    min: false
                }
            },
            searchEvent: {target: {value: ''}},
            sort: {by: 'firstName', direction: 'asc'}
        };
    }

    static contextTypes = {
        history: React.PropTypes.object,
        location: React.PropTypes.object
    }

    // filter data
    filterCustomers = event => {

        let filter = event.target.value.toUpperCase();
        // this step is so that I can get updated value on this.getAllCustomerData
        // with the same filter while adding users
        // this is because he state.searchEvent was passed here and it doesn't have a val
        //
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

    sortCustomers = sortBy => {
        let direction = this.state.sort.direction;

        if (!sortBy) {
            // initial sort
            sortBy = this.state.sort.by;
        } else if (sortBy === this.state.sort.by) {
            // flip direction if the same item was clicked
            direction = direction === 'asc' ? 'desc' : 'asc';
        } else {
            // new item always has this default direction
            direction = 'asc';
        }

        // keeping new sort and direction information in state
        let sortTemp = {by: sortBy, direction: direction};
        this.setState({sort: sortTemp});

        this.state.filteredCustomers = _.sortByOrder(this.state.filteredCustomers,
            [customerField => {
                // this is so the comparison is case insensitive
                if (typeof customerField[sortBy] === 'string') {
                    return customerField[sortBy].toLowerCase();
                }
                return customerField[sortBy];
            }], [direction]);

        this.setState({filterCustomers: this.state.filteredCustomers});
        // console.log(sortBy, direction);
    }

    getAllCustomerData = () => {
        $.get('http://localhost:8000/api/customers', (data) => {
            // console.log('getting all customers...');
            this.setState({allCustomers: data});
            // keep current filter even while updating field
            this.filterCustomers(this.state.searchEvent);
            // initial sort
            this.sortCustomers();
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
        this.setState({dirty: true});
        let property = event.target.name;
        let value = event.target.value;
        this.state.customer[property] = value;
        this.setState({customer: this.state.customer});
    }

    validateCustomerFormFields = event => {
        let field = event.target.name;
        let value = event.target.value;
        let errorObject = Object.assign({}, this.state.errors);

        if (field === 'firstName' || field === 'lastName') {
            errorObject[field].required = !value; //check if empty
            errorObject[field].min = !!(value && value.length <= 2); // check min length
        }

        //console.dir(JSON.stringify(errorObject));
        this.setState({error: errorObject});
    }

    updateForm = event => {
        event.preventDefault();

        let isNotValid = () => {
            for (let field in this.state.errors) {
                for (let fieldErrors in this.state.errors[field]) {
                    if (this.state.errors[field][fieldErrors]) {
                        return true; // return true if any errors are true in 'this.state.errors'
                    }
                }
            }
        };

        if (!this.state.dirty) {
            this.setState({displayDirtyErrorMessage: true});
            setTimeout(() => {
                this.setState({displayDirtyErrorMessage: false});
            }, 3000);
        } else if (isNotValid()) { // check if all form entries are in valid state
            this.setState({displayInvalidErrorMessage: true});
            setTimeout(() => {
                this.setState({displayInvalidErrorMessage: false});
            }, 3000);
        } else { // is all entries are valid submit form
            let firstName = this.state.customer.firstName;
            let lastName = this.state.customer.lastName;

            Actions.addCustomer({firstName: firstName, lastName: lastName});

            this.state.customer.firstName = '';
            this.state.customer.lastName = '';

            document.querySelector('#firstName').focus();
            // this.context.history.pushState(null, '/test');
        }
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
                    displayDirtyErrorMessage={this.state.displayDirtyErrorMessage}
                    displayInvalidErrorMessage={this.state.displayInvalidErrorMessage}
                    validateCustomerFormFields={this.validateCustomerFormFields}
                    updateForm={this.updateForm}
                    errors={this.state.errors}
                />

                <Customers
                    customers={this.state.filteredCustomers}
                    removeCustomer={this.removeCustomer}
                    filterCustomers={this.filterCustomers}
                    sortCustomers={this.sortCustomers}
                />

            </div>
        );
    }
}

