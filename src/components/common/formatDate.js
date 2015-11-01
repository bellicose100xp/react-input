/**
 * Created by admin on 10/31/2015.
 */
'use strict';
import React from 'react';

export default props => {

    let dateToFormat = new Date(props.date);
    let day = dateToFormat.getDate().toString();
    day = day.length === 1 ? `0${day}` : day;
    let month = dateToFormat.getMonth() + 1;
    month = month.toString();
    month = month.length === 1 ? `0${month}` : month;
    let year = dateToFormat.getFullYear().toString().substr(2);
    let formattedDate = `${month}/${day}/${year}`;

    return (
        <span>{formattedDate}</span>
    );
};