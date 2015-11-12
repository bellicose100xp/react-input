/**
 * Created by admin on 11/12/2015.
 */
'use strict';
import React from 'react';

export default dumbComponent => class extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            items: 10,
            name: 'belli'
        };
    }

    render() {
        return <dumbComponent {...this.state} {...this.props} />;
    }
};

