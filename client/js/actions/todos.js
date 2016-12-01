/**
 * Created by chan on 11/23/16.
 */
import { createAction } from 'redux-actions';
import ActionTypes from '../constants/ActionTypes';

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
sometimes we need to adjust actions to use a customized payload creator, and
that means re-ordering const {...}; also it is clearer for every single action.

We also opt in for more specific parameters for actions:
instead of addTodo(obj = {text: '...'}), we prefer addTodo(text), because it leads to more predictability.
 */
export const addTodo = createAction(ActionTypes.ADD_TODO, (text) => ({ text }));

export const updateTodo = createAction(ActionTypes.UPDATE_TODO, (id, text) => ({ id, text }));

export const deleteTodo = createAction(ActionTypes.DELETE_TODO, (id) => ({ id }));

export const getTodos = createAction(ActionTypes.GET_TODOS);
