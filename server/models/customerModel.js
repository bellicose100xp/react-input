'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let customerModel = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    }
});

module.exports = mongoose.model('Customer', customerModel);