/**
 * Created by admin on 11/12/2015.
 */
'use strict';
import React from 'react';
import Wrapper from './wrapperHoc';

const dumbComponent = props => {
    return <div> {props.name}: {props.items} </div>;
};

export default Wrapper(dumbComponent);