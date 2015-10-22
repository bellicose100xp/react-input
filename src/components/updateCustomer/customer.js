/**
 * Created by buggy on 10/7/15.
 */
'use strict';
import React from 'react';
import InputUpdateCustomer from './inputUpdateCustomer';
import customerStore from '../../flux/customerStore';
import Actions from '../../flux/actions';
import {restServerAPI} from '../common/appConstants';

export default class Customer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            customer: {}
        };
    }

    getCustomerById = () => {
        $.get(`${restServerAPI}/${this.props.params.customerId}`, (data) => {
            this.setState({customer: data});
        });
    }

    componentDidMount = () => {
        //document.querySelector('#firstName').focus();
        this.getCustomerById();
    }

    updateCustomerFields = event => {
        let property = event.target.name;
        let value = event.target.value;
        this.state.customer[property] = value;
        this.setState({customer: this.state.customer});
    }

    updateCustomer = event => {
        event.preventDefault();

        let id = this.state.customer._id;
        let firstName = this.state.customer.firstName;
        let lastName = this.state.customer.lastName;

        Actions.updateCustomer({id: id, firstName: firstName, lastName: lastName});

        // document.querySelector('#firstName').focus();

        this.context.history.pushState(null, '/');

    }

    render() {
        // let {customerId} = this.props.params; //get the parameter from the params object

        return (
            <div>
                <InputUpdateCustomer
                    customer={this.state.customer}
                    updateCustomerFields={this.updateCustomerFields}
                    updateCustomer={this.updateCustomer}
                />
            </div>
        );
    }
}

Customer.contextTypes = {
    history: React.PropTypes.object,
    location: React.PropTypes.object
};