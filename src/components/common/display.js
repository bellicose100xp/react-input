/**
 * Created by admin on 10/12/2015.
 */
'use strict';
import React from 'react';

export default props => props.if ? <span>{props.children}</span> : <span></span>;
