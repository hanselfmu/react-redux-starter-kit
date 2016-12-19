/**
 * Created by chan on 11/20/16.
 */
import fetch from 'isomorphic-fetch';

const urlPrefix = '/api/';

const request = (url, method, body) => {
    let params = {
        credentials: 'same-origin',
        headers: {
            "Content-Type": 'application/json;charset=utf-8'
        },
        method
    };

    if (body) params.body = JSON.stringify(body);

    return fetch(`${urlPrefix}${url}`, params)
        .then(response => response.json())
        .catch(err => { console.log('error making request'); });
};

export default {
    getTodos: () => request('todos', 'GET'),
    saveTodos: (todos) => request('todos', 'PUT', todos)
};
