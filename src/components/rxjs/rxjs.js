/**
 * Created by admin on 10/30/2015.
 */
'use strict';

import React from 'react';
import Rx from 'rx';
import {restSearchAPI} from '../common/appConstants';

export default class RxJS extends React.Component {
    constructor() {
        super();
        this.state = {
            customers: []
        };
    }

    componentDidMount = () => {
        let input = document.querySelector('#search');

        let queryServer = searchTerm => {
            return $.ajax({
                url: restSearchAPI,
                data: {
                    searchTerm: searchTerm
                }
            }).promise();
        };

        Rx.Observable.fromEvent(input, 'keyup')
            .pluck('target', 'value')
            .filter(text => text.length > 2)
            .debounce(500)
            .distinctUntilChanged()
            .flatMapLatest(queryServer)
            .subscribe(data => {
                this.setState({customers: data});
            });
    }

    displayCustomerRow = customer => {
        console.log(JSON.stringify(customer));
        return (
            <tr key={customer._id}>
                <td>{customer.firstName}</td>
                <td>{customer.lastName}</td>
                <td>{customer.created_at}</td>
                <td>{customer.updates_at}</td>
            </tr>
        );
    }

    render() {
        return (
            <div>
                <input id="search" type="text" className="form-control" placeholder="Search Query"/>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Created</th>
                        <th>Updates</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.customers.map(this.displayCustomerRow)}
                    </tbody>
                </table>
            </div>
        );
    }
}
