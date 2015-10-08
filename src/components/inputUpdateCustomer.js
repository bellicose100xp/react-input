/**
 * Created by buggy on 9/23/15.
 */
'use strict';
import React from 'react';
import {Link} from 'react-router';

export default class InputUpdateCustomer extends React.Component {

    render() {

        return (
            <div>
                <form className="form col-md-6 col-md-offset-3" onSubmit={this.props.updateCustomer}>

                    <div className="form-group">
                        <label htmlFor="firstName">First Name: </label>
                        <input
                            id="firstName"
                            className="form-control"
                            name="firstName"
                            ref="firstName"
                            value={this.props.customer.firstName}
                            onChange={this.props.updateCustomerFields}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="lastName">Last Name: </label>
                        <input
                            className="form-control"
                            name="lastName"
                            ref="lastName"
                            value={this.props.customer.lastName}
                            onChange={this.props.updateCustomerFields}
                        />
                    </div>

                    <input className="btn btn-primary" type="submit" value="Submit"/>

                </form>
            </div>
        );
    }
}