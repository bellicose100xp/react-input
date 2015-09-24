/**
 * Created by buggy on 9/23/15.
 */
'use strict';
import React from 'react';

export default class Input extends React.Component {

    render() {
        return (
            <div>
                <form className="form col-md-6 col-md-offset-3" onSubmit={this.props.updateForm.bind(this)}>

                    <div className="form-group">
                        <label htmlFor="firstName">First Name: </label>
                        <input
                            className="form-control"
                            name="firstName"
                            ref="firstName"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="lastName">Last Name: </label>
                        <input
                            className="form-control"
                            name="lastName"
                            ref="lastName"
                        />
                    </div>

                    <input className="btn btn-primary" type="submit" value="Submit"/>

                </form>
            </div>
        );
    }
}