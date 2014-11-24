'use strict';

var NextAppDispatcher = require('../dispatcher/NextAppDispatcher');
var NextAppConstants = require('../constants/NextAppConstants');
var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');

var ActionTypes = NextAppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _posts = [];
var _single;

function _addPosts(rawPosts) {
  _posts = [];
  rawPosts.forEach(function(post) {
    _posts.push(post);
  });
}

function _setSingle(rawSingle) {
  _single = rawSingle;
}

var PostStore = merge(EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  get: function(id) {
    return _posts[id];
  },

  getAll: function() {
    return _posts;
  },

  getSingle: function() {
    return _single;
  }

});

PostStore.dispatchToken = NextAppDispatcher.register(function(payload) {
  var action = payload.action;
  switch (action.type) {

    case ActionTypes.GET_POST_SUCCESS:
      _addPosts(action.data);
      PostStore.emitChange();
      break;
    case ActionTypes.GET_SINGLE_SUCCESS:
      _setSingle(action.data);
      PostStore.emitChange();
      break;

    default:
  }
});


module.exports = PostStore;
