/**
 * Created by chan on 11/27/16.
 */
const api = require('../middleware/api');

exports.getTodos = async function(req, res) {

    // Traditional Promise way
    //api.getTodos().then(data => res.send(data));

    res.send(await api.getTodos());
}

exports.addTodo = function(req, res) {

}