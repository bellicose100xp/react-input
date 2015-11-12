/**
 * Created by admin on 11/12/2015.
 */
'use strict';
import React from 'react';
import wrapper from './wrapperHoc';

let DumbComponent = props => <div>{props.name} has {props.items} items</div>;

export default wrapper(DumbComponent);