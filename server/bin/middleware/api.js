'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * Created by chan on 11/27/16.
 */
var fs = require('mz/fs'); // for mock data
var path = require('path');

var wrap = function wrap(fn) {
    return function () {
        return fn.apply(undefined, arguments).catch(arguments.length <= 2 ? undefined : arguments[2]);
    };
};

/*
This is a http request wrapper for mock requests (IO with files);
for real APIs change these IOs into http requests.
 */
var httpRequest = function httpRequest(options) {
    switch (options.method) {

        case 'get':
            return wrap(_asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return fs.readFile(path.resolve(__dirname, '../../data/', options.url), 'utf8');

                            case 2:
                                return _context.abrupt('return', _context.sent);

                            case 3:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            })));

        case 'put':
            return wrap(function () {
                var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(payload) {
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    _context2.next = 2;
                                    return fs.writeFile(path.resolve(__dirname, '../../data/', options.url), JSON.stringify(payload), 'utf8');

                                case 2:
                                    return _context2.abrupt('return', _context2.sent);

                                case 3:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, this);
                }));

                return function (_x) {
                    return _ref2.apply(this, arguments);
                };
            }());

        default:
            return;

    }
};

exports.getTodos = httpRequest({
    url: 'todos.json',
    method: 'get'
});

exports.saveTodos = httpRequest({
    url: 'todos.json',
    method: 'put'
});