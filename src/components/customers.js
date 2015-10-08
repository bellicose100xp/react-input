/**
 * Created by HSO on 9/25/15.
 */
'use strict';
import React from 'react';
import {Link} from 'react-router';

export default class Customers extends React.Component {

    createCustomerRow = (customer) => {
        return (
          <tr key={customer._id}>
              <td>{customer._id}</td>
              <td>{customer.firstName}</td>
              <td>{customer.lastName}</td>
              <td><Link to={`/customer/${customer._id}`}>Edit Customer</Link></td>
          </tr>
        );
    }

    render() {
        return (
            <table className="table table-table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                {this.props.customers.map(this.createCustomerRow)}
                </tbody>
            </table>
        );
    }
}

