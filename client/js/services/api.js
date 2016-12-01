/**
 * Created by chan on 11/20/16.
 */
import fetch from 'isomorphic-fetch';

const urlPrefix = '/api/';

const defaultFetchParams = {
    credentials: 'same-origin',
    headers: {
        "Content-Type": 'application/json;charset=utf-8'
    }
}

const request = (url, method, body) => fetch(
    `${urlPrefix}${url}`,
    {
        ...defaultFetchParams,
        method
    }
)
    .then(response => response.json())
    .catch(err => { console.log('error making request') })

export default {
    getTodos() {
        return request('todos', 'GET')
    }
}