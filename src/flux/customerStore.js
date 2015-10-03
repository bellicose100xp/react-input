/**
 * Created by admin on 10/2/2015.
 */
'use strict';
import dispatcher from './dispatcher';
import constants from './constants';
import { EventEmitter } from 'events';
//var EventEmitter = require('events').EventEmitter;
import Firebase from 'firebase';

const CHANGE_EVENT = 'change';

let _customers = [];

var ref = new Firebase("https://buggy-react.firebaseio.com/");

let addCustomer = (newCustomer) => {
    ref.push(newCustomer);
};
// test

let customerStore = Object.assign({}, EventEmitter.prototype, {

    /**
     * Get the entire collection of TODOs.
     * @return {object}
     */
    getAllCustomer: () => {
        ref.on('value', function(dataSnapshot) {
           // console.dir(Object.prototype.toString.call(dataSnapshot.val()));
           // console.dir(Object.prototype.toString.call(['x', 'y', 'z']));
            _customers = [];
           let x = dataSnapshot.val();
            //console.log(x);
            for (let key in x) {
                console.log(x[key]);
                _customers.push(Object.assign({key: key}, x[key]));
            }
            console.dir(_customers);
           // _customers = dataSnapshot.val();
        });
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