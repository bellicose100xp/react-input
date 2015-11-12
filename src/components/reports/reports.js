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
            width: 1000,
            height: 400,
            padding: 2,
            barWidthRef: 25,
            frequency: []
        };
    }

    drawChart = () => {
        if (this.mounted) {
            let reportElement = d3.select('#reports');
            let reportElementWidth = reportElement.node().getBoundingClientRect().width;

            //   console.log(reportElementWidth, this.state.frequency.length);
            if(d3.select('svg')){
                d3.select('svg').remove();
            }

            let svg = reportElement.append('svg')
                .attr({
                    width: reportElementWidth,
                    height: this.state.height
                });

            let xScale = d3.scale.linear().domain([0, this.state.frequency.length]).range([0, reportElementWidth]);
            //  console.log(`freq: ${this.state.frequency.length} xScale(5): ${xScale(5)} `);
            let yScale = d3.scale.linear().domain([0, d3.max(this.state.frequency, data => data[1])]).range([this.state.height, 0]);
            //console.log(`freq: ${this.state.frequency}, max: ${d3.max(this.state.frequency, data => data[1])}`);
            //console.log(`yScale(5): ${yScale(5)} `);

            svg.selectAll('rect')
                .data(this.state.frequency)
                .enter()
                .append('rect')
                .attr({
                    x: (d, i) => xScale(i),
                    y: d => yScale(d[1]),
                    width: (d, i) => (xScale(this.state.frequency.length) / this.state.frequency.length) - this.state.padding,
                    height: d => this.state.height - yScale(d[1]),
                    fill: '#666'
                });

            svg.selectAll('text')
                .data(this.state.frequency)
                .enter()
                .append('text')
                .text(data => `${data[0]}: ${data[1]}`)
                .attr({
                    'text-anchor': 'end',
                    x: (d, i) => xScale(i),
                    y: d => yScale(d[1]),
                    fill: 'white',
                    transform: (d, i) => `translate(${(xScale(this.state.frequency.length) / this.state.frequency.length) / 1.5}, ${this.state.padding * 2}) rotate(270 ${xScale(i)} ${yScale(d[1])})`
                });

        }
    }

    getFirstNameFrequency = () => {
        if (this.mounted) {
            let reportElementW = d3.select('#reports')
                .node()
                .getBoundingClientRect()
                .width;

            let barChartColumns = Math.floor(reportElementW / this.state.barWidthRef);

            let frequency = _(this.state.customers)
                .countBy(data => data.firstName)
                .omit(data => data < 7)
                .pairs()
                .sortBy(data => data[1])
                .reverse()
                .slice(0, barChartColumns)
                .value();
            //console.log(frequency);
            this.setState({frequency: frequency}, this.drawChart);
        }
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
        this.mounted = true;
        this.getAllCustomers();
        window.addEventListener('resize', _.debounce(this.getFirstNameFrequency, 300));
    }

    componentWillUnmount = () => {
        this.mounted = false;
    }

    render() {
        return (
            <div id="reports">
            </div>
        );
    }
}