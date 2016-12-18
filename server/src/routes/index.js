/**
 * Created by chan on 11/27/16.
 */
const todos = require('./todos');

module.exports = function(router) {
    todos(router);

    return router;
}
