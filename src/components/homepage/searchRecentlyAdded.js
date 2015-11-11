'use strict';
import React from 'react';

export default class SearchRecentlyAdded extends React.Component {

    render() {
        return (
            <div className="search-box input-search-items">
                <div className="form-group">
                    <label htmlFor="filter">Search Recently Added:</label>
                    <input
                        className="form-control"
                        placeholder="Filter the list below (Recently added customers)"
                        name="filter"
                        ref="filter"
                        onChange={this.props.filterCustomers}
                    />
                </div>
            </div>
        );
    }
}

