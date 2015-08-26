/**
 * Created by buggy on 8/25/15.
 */
"use strict";
var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var AuthorsApi = require('../api/authorApi');

var InitializeActions = {
  initApp: function () {
      Dispatcher.dispatch({
          actionType: ActionTypes.INITIALIZE,
          initialData: {
              authors: AuthorsApi.getAllAuthors()
          }
      });
  }
};

module.exports = InitializeActions;