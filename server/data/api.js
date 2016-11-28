/**
 * Created by chan on 11/27/16.
 */
var fs = require('mz/fs');  // for mock data
var path = require('path');
var wrap = require('co-express');

const urlPrefix = '/data/';

const httpRequest = (options) => {
    return wrap(function* (req, res) {
        let result = yield fs.readFile(path.resolve(__dirname, 'todos.json'), 'utf8');
        console.log(result);
        res.send(result);
    });

    // return function(req, res) {
    //     console.log(__dirname);
    //     fs.readFile(path.resolve(__dirname, 'todos.json'), 'utf8', function(err, data) {
    //         "use strict";
    //         console.log(err);
    //         console.log(data);
    //     })
    // }
}

exports.getTodos = httpRequest({
    url: 'todos.json',
    method: 'get'
})