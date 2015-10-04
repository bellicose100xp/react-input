/**
 * Created by admin on 10/2/2015.
 */
'use strict';
import dispatcher from './dispatcher';
import constants from './constants';
import { EventEmitter } from 'events';
//var EventEmitter = require('events').EventEmitter;

const CHANGE_EVENT = 'change';

let _customers = [];

let addCustomer = (newCustomer) => {
    _customers.push(newCustomer);
};

let customerStore = Object.assign({}, EventEmitter.prototype, {

    /**
     * Get the entire collection of TODOs.
     * @return {object}
     */
    getAllCustomer: () => {
        return _customers;
    },

    // using arrow functions results in error on any of the 'this.om'
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

// Register callback to handle all updates
dispatcher.register(action => {
    let text;

    switch(action.actionType) {
        case constants.ADD_CUSTOMER:
            text = action.newCustomer;
            if (text !== '') {
                addCustomer(text);
                customerStore.emitChange();
            }
            break;

        default:
        // no op
    }
});

export default customerStore;