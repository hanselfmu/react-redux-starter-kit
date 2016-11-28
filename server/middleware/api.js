/**
 * Created by chan on 11/27/16.
 */
const fs = require('mz/fs');  // for mock data
const path = require('path');

let wrap = fn => (...args) => fn(...args).catch(args[2])

const httpRequest = (options) => {
    switch (options.method) {
        case 'get':
            return wrap(async function() {
                let result = await fs.readFile(path.resolve(__dirname, '../data/', options.url), 'utf8');
                console.log(result);
                return result;
            });
        default:
            return;

    }
}

exports.getTodos = httpRequest({
    url: 'todos.json',
    method: 'get'
});