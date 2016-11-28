/**
 * Created by chan on 11/27/16.
 */
const api = require('../middleware/api');

exports.getTodos = async function(req, res) {
    console.log("I am at controller sending request to API");
    // Traditional Promise way
    //api.getTodos().then(data => res.send(data));

    res.send(await api.getTodos());
}

exports.addTodo = function(req, res) {

}