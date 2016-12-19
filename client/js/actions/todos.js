/**
 * Created by chan on 11/23/16.
 */
import { createAction } from 'redux-actions';
import ActionTypes from '../constants/ActionTypes';
import api from '../services/api';

/*
We need actions like this:
export function addTodo(text) {
 return { type: ActionTypes.ADD_TODO, payload: {text} };
}

export function deleteTodo(id) {
 return { type: ActionTypes.DELETE_TODO, payload: {id} };
}

export function updateTodo(id, text) {
 return { type: ActionTypes.UPDATE_TODO, payload: {id, text} };
}

We use singular createAction instead of createActions because
sometimes we need to adjust actions to use a customized payload creator, and doing this with "createActions"
means re-ordering const {...}; also it is not possible to give actions customized names.

And it is clearer for every single action.

We also opt in for more specific parameters for actions:
instead of addTodo(obj = {text: '...'}), we prefer addTodo(text), because it leads to more predictability.
 */
export const addTodo = createAction(ActionTypes.ADD_TODO, text => ({ text }));

export const updateTodo = createAction(ActionTypes.UPDATE_TODO, (id, text, status) => ({ id, text, status }));

export const deleteTodo = createAction(ActionTypes.DELETE_TODO, id => ({ id }));

export const receiveTodos = createAction(ActionTypes.RECEIVE_TODOS);

export const getTodos = createAction(ActionTypes.GET_TODOS, () => dispatch => {
    api.getTodos().then(res => {
        dispatch(receiveTodos(res));
    });
});

export const saveTodos = createAction(ActionTypes.SAVE_TODOS, (todos) => dispatch => {
    api.saveTodos(todos).then(res => {
        console.log(res);
    });
});
