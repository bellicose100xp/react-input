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

// since I named the model 'Customer', mongoose will automatically look for 'customers' collection
module.exports = mongoose.model('Customer', customerModel);