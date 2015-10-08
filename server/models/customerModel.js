'use strict';

let mongoose = require('mongoose');

let customerSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    }
});

// since I named the model 'Customer', mongoose will automatically look for 'customers' collection
module.exports = mongoose.model('Customer', customerSchema);