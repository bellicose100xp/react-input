/**
 * Created by admin on 10/12/2015.
 */
'use strict';
import React from 'react';

const Display = props => {
    return props.if ? <span>{props.children}</span> : <span></span>;
};

export default Display;