/**
 * Created by buggy on 8/25/15.
 */
"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter; //? where is this??
var assign = require('object-assign');
var CHANGE_EVENT = 'change';
var _ = require('lodash');

var _authors = []; //private api

var AuthorStore = assign({}, EventEmitter.prototype, {
    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },
    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },
    getAllAuthors: function () {
        return _authors;
    },
    getAuthorById: function (id) {
        return _.find(_authors, {id: id});
    }
});

Dispatcher.register(function (action) {
    switch (action.actionType) {
        case ActionTypes.INITIALIZE:
            _authors = action.initialData.authors;
            AuthorStore.emitChange();
            break;

        case ActionTypes.CREATE_AUTHOR:
            _authors.push(action.author); // this author comes from authorActions payload
            AuthorStore.emitChange();
            break;

        case ActionTypes.UPDATE_AUTHOR:
            var authorToUpdate = _.find(_authors, {id: action.author.id});
            var indexOfAuthor = _.indexOf(_authors, authorToUpdate);
            _authors.splice(indexOfAuthor, 1, action.author);
            AuthorStore.emitChange();
            break;

        default :
            // no operation

    }
});

module.exports = AuthorStore;