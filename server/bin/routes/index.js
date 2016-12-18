'use strict';

/**
 * Created by chan on 11/27/16.
 */
var todos = require('./todos');

module.exports = function (router) {
  todos(router);

  return router;
};