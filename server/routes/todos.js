/**
 * Created by chan on 11/27/16.
 */
const todos = require('../controllers/todos');

module.exports = function(router) {
    router.get('/todos', todos.getTodos);
    router.put('/todos', todos.saveTodos);
}

