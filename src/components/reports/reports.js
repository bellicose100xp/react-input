/**
 * Created by admin on 11/11/2015.
 */
'use strict';
import React from 'react';
import d3 from 'd3';
import {getAllCustomerAPI} from '../common/appConstants';
import _ from 'lodash';

export default class Test extends React.Component {

    constructor() {
        super();
        this.state = {
            customers: [],
            w: 400,
            h: 200,
            frequency: []
        };
    }

    getFirstNameFrequency() {
        let frequency = _.countBy(this.state.customers, data => data.firstName);
            console.log(frequency);
        //this.setState({frequency: frequency}, () => {
        //    console.log(this.state.frequency);
        //});
    }

    getAllCustomers = () => {
        fetch(getAllCustomerAPI)
            .then(response => response.json())
            .then(data => {
                this.setState({customers: data}, this.getFirstNameFrequency);
            })
            .catch(err => {
                console.log(err);
            });
    }

    componentDidMount = () => {

        let svg = d3.select('#reports')
            .append('svg')
            .attr({
                width: this.state.w,
                height: this.state.h
            });

        this.getAllCustomers();
    }

    render() {
        return (
            <div id="reports">
            </div>
        );
    }
}