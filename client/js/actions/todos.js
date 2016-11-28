/**
 * Created by chan on 11/23/16.
 */
import ActionTypes from '../constants/ActionTypes';

export function createTodo(text) {
    return { type: ActionTypes.TODO_CREATE, text };
}

export function deleteTodo(id) {
    return { type: ActionTypes.TODO_DELETE, id };
}

export function updateTodo(id, text) {
    return { type: ActionTypes.TODO_UPDATE, id, text };
}