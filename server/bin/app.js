'use strict';

/**
 * Created by chan on 11/22/16.
 */
require('babel-polyfill');
var express = require('express');
var app = new express();
var path = require('path');
var bodyParser = require('body-parser');
var multer = require('multer');
var router = require('./routes')(express.Router());

var port = process.env.PORT || 3000;

app.use(express.static('client'));

/**
 * Note: Generally we don't need an application server for serving
 * static files; instead we can use a web server such as nginx for static resources.
 */
app.get('/assets/*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../../client/style' + req.path));
});

app.get('/build/*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../../client/build' + req.path));
});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/api', router);

app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../../client/build', 'app.html'));
});

app.listen(port, function () {
    console.log('server listening on port ' + port);
});