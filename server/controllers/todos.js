/**
 * Created by chan on 11/27/16.
 */
const api = require('../data/api');

exports.getTodos = function(req, res) {
    console.log("I am at controller sending request to API");
    res.send(api.getTodos());
}

exports.addTodo = function(req, res) {

}