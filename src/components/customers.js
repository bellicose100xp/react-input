/**
 * Created by HSO on 9/25/15.
 */
'use strict';
import React from 'react';
import {Link} from 'react-router';
import Display from './common/display';

export default class Customers extends React.Component {

    createCustomerRow = (customer) => {
        return (
            <tr key={customer._id}>
                <td>{customer.firstName}</td>
                <td>{customer.lastName}</td>
                <td><Link to={`/customer/${customer._id}`}>Edit Customer</Link></td>
                <td>
                    <button className="btn btn-danger" onClick={this.props.removeCustomer.bind(null, customer)}>Delete
                    </button>
                </td>
            </tr>
        );
    }

    render() {
        return (
            <div>

                <div className="row hr-before-search"><hr /></div>

                <div className="form-group col-md-6 col-sm-6 col-xs-12 search-box">
                    <label htmlFor="filter">Search:</label>
                    <input
                        className="form-control"
                        name="filter"
                        ref="filter"
                        onChange={this.props.filterCustomers}
                    />
                </div>

                <table className="table table-striped col-md-12 col-sm-12 col-xs-12">
                    <thead>
                    <tr>
                        <th onClick={this.props.sortCustomers.bind(null, 'firstName')}>
                            First Name{' '}
                        <Display if={this.props.sort.by === 'firstName'}>
                            {this.props.sort.direction === 'asc' ?
                                (<span className="glyphicon glyphicon-sort-by-attributes text-primary"> </span>)
                                : (<span className="glyphicon glyphicon-sort-by-attributes-alt text-primary"> </span>)}
                        </Display>
                        </th>
                        <th onClick={this.props.sortCustomers.bind(null, 'lastName')}>
                            Last Name{' '}
                            <Display if={this.props.sort.by === 'lastName'}>
                                {this.props.sort.direction === 'asc' ?
                                    (<span className="glyphicon glyphicon-sort-by-attributes text-primary"> </span>)
                                    : (<span className="glyphicon glyphicon-sort-by-attributes-alt text-primary"> </span>)}
                            </Display>
                        </th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.customers.map(this.createCustomerRow)}
                    </tbody>
                </table>
            </div>
        );
    }
}

