'use strict';

let mongoose = require('mongoose');

let customerSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    }
});

// mongoose middleware
customerSchema.pre('save', function (next) {
    let now = new Date();
    this.updated_at = now;
    if (!this.created_at) {
        this.created_at = now;
    }
    next();
});

// since I named the model 'Customer', mongoose will automatically look for 'customers' collection
module.exports = mongoose.model('Customer', customerSchema);