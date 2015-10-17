/**
 * Created by buggy on 9/23/15.
 */
'use strict';
import React from 'react';
import {Link} from 'react-router';
import Display from './common/display';

export default class Input extends React.Component {

    render() {

        return (
            <div className="col-md-6 col-xs-6 col-sm-6 input-box">
                <form onSubmit={this.props.updateForm} onReset={this.props.resetErrors}>

                    <div className="form-group">
                        <label htmlFor="firstName">First Name: </label>
                        <input
                            id="firstName"
                            className="form-control"
                            name="firstName"
                            ref="firstName"
                            value={this.props.customer.firstName}
                            onChange={this.props.updateCustomer}
                            onBlur={this.props.validateCustomerFormFields}
                        />
                        <Display if={this.props.errors.firstName.required}>
                            <span className="text-danger"> First name is Required</span>
                        </Display>
                        <Display if={this.props.errors.firstName.min}>
                            <span className="text-danger"> First name must be more than 2 characters</span>
                        </Display>
                    </div>

                    <div className="form-group">
                        <label htmlFor="lastName">Last Name: </label>
                        <input
                            className="form-control"
                            name="lastName"
                            ref="lastName"
                            value={this.props.customer.lastName}
                            onChange={this.props.updateCustomer}
                            onBlur={this.props.validateCustomerFormFields}
                        />
                        <Display if={this.props.errors.lastName.required}>
                            <span className="text-danger"> Last name is Required</span>
                        </Display>
                        <Display if={this.props.errors.lastName.min}>
                            <span className="text-danger"> Last name must be more than 2 characters</span>
                        </Display>
                    </div>


                    <input className="btn btn-primary" type="submit" value="Submit"/>
                    <input className="btn btn-primary reset-button" type="reset" value="Reset"/>
                    <Display if={this.props.displayDirtyErrorMessage}>
                        <span className="error">Please fill the form first!!!</span>
                    </Display>
                    <Display if={this.props.displayInvalidErrorMessage}>
                        <span className="error">Check all errors on page</span>
                    </Display>


                </form>
            </div>
        );
    }
}