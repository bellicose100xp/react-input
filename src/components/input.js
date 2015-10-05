/**
 * Created by buggy on 9/23/15.
 */
'use strict';
import React from 'react';
import {Link} from 'react-router';

export default class Input extends React.Component {

    render() {

        let firstNameClass = 'form-group';
        let firstNameHelpText = '';

        if (this.props.customer.firstName && this.props.customer.firstName.length <= 2) {
            firstNameClass += ' has-error';
            firstNameHelpText = 'First Name must be more than 2 characters';
            this.props.dirty = true;
        } else {
            firstNameClass = 'form-group';
            firstNameHelpText = '';
            this.props.dirty = false;
        }

        return (
            <div>
                <form className="form col-md-6 col-md-offset-3" onSubmit={this.props.updateForm}>

                    <div className={firstNameClass}>
                        <label htmlFor="firstName">First Name: </label>
                        <input
                            id="firstName"
                            className="form-control"
                            name="firstName"
                            ref="firstName"
                            value={this.props.customer.firstName}
                            onChange={this.props.updateCustomer}
                        />
                        <span className="help-block">{firstNameHelpText}</span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="lastName">Last Name: </label>
                        <input
                            className="form-control"
                            name="lastName"
                            ref="lastName"
                            value={this.props.customer.lastName}
                            onChange={this.props.updateCustomer}
                        />
                    </div>

                    <input className="btn btn-primary" type="submit" value="Submit"/>

                </form>
            </div>
        );
    }
}