/**
 * Created by HSO on 9/25/15.
 */
'use strict';
import React from 'react';

export default class Customers extends React.Component {

    createCustomerRow = (customer, index) => {
        return (
          <tr key={index}>
              <td>{customer.firstName}</td>
              <td>{customer.lastName}</td>
          </tr>
        );
    }

    render() {
        return (
            <table className="table table-table-striped">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                {this.props.customers.map(this.createCustomerRow)}
                </tbody>
            </table>
        );
    }
}

