'use strict';
import React from 'react';

export default Component => class extends React.Component {

        constructor(props) {

            super(props);

            this.state = {
                items: 13,
                name: 'belli'
            };
        }

        render() {
            return <Component {...this.state} {...this.props} />;
        }
    };


